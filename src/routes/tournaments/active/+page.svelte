<script>
	import { Trophy, Check, Swords, ArrowRight } from 'lucide-svelte';
	import Button from '../../../components/ui/Button.svelte';
	import GlassCard from '../../../components/ui/GlassCard.svelte';
	import { tournamentStore } from '../../../store/tournamentStore.js';
	import { playerStore } from '../../../store/playerStore.js';
	import { addToast } from '../../../store/toastStore.js';
	import { goto } from '$app/navigation';
	import { generatePairings } from '../../../lib/algorithms/matchmaking.js';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$tournamentStore.id || $tournamentStore.status === 'COMPLETE' || $tournamentStore.status === 'DRAFT') {
			goto('/tournaments', { replaceState: true });
		}
	});

	let rounds = $derived($tournamentStore?.rounds || []);
	let currentRound = $derived(rounds[rounds.length - 1] || { roundNumber: 1, matches: [] });
	
	function getPlayerName(id) {
		if (!id) return 'BYE (Auto-Advance)';
		return $playerStore.find(p => p.id === id)?.name || 'Unknown';
	}
	
	function getPlayerElo(id) {
		if (!id) return '-';
		return $playerStore.find(p => p.id === id)?.elo || '-';
	}

	function setWinner(roundIndex, matchId, winnerId) {
		if (roundIndex !== rounds.length - 1) return;

		tournamentStore.update(store => {
			const updatedRounds = store.rounds.map((r, i) => {
				if (i === roundIndex) {
					return {
						...r,
						matches: r.matches.map(m => m.id === matchId ? { ...m, winnerId } : m)
					};
				}
				return r;
			});
			return { ...store, rounds: updatedRounds };
		});

		if (winnerId) {
			addToast(`CONFIRMED: ${getPlayerName(winnerId)} wins!`, 'success');
		}
	}
	
	function simulateRemaining() {
		tournamentStore.update(store => {
			const updatedRounds = store.rounds.map((r, i) => {
				if (i === store.rounds.length - 1) {
					return {
						...r,
						matches: r.matches.map(m => {
							if (!m.winnerId) {
								if (!m.player2Id) return { ...m, winnerId: m.player1Id }; // Bye
								// Genuine random mathematically unbiased selector
								const winner = Math.random() > 0.5 ? m.player1Id : m.player2Id;
								return { ...m, winnerId: winner };
							}
							return m;
						})
					};
				}
				return r;
			});
			return { ...store, rounds: updatedRounds };
		});
		addToast('Round Automated Results Generated!', 'success');
	}
	
	function advanceRound() {
		const unfinished = currentRound.matches.some(m => !m.winnerId);
		if (unfinished) {
			addToast('HALT: Resolve all battles in the current bracket!', 'error');
			return;
		}
		
		const winners = currentRound.matches.map(m => m.winnerId).filter(id => id);
		
		if (winners.length === 1) {
			playerStore.update(players => {
				return players.map(p => {
					let pWins = 0, pLosses = 0;
					rounds.forEach(r => {
						r.matches.forEach(m => {
							if (m.player1Id === p.id || m.player2Id === p.id) {
								if (m.winnerId === p.id) pWins++;
								else pLosses++;
							}
						});
					});
					
					if (pWins > 0 || pLosses > 0) {
						return { ...p, wins: p.wins + pWins, losses: p.losses + pLosses, points: p.points + (pWins * 3) };
					}
					return p;
				});
			});

			tournamentStore.update(t => ({ ...t, status: 'COMPLETE' }));
			addToast(`DOMINATION COMPLETE! ${getPlayerName(winners[0])} IS THE SUPREME CHAMPION!`, 'success');
			goto('/rankings');
			return;
		}
		
		const nextMatches = generatePairings(winners);
		tournamentStore.update(store => {
			return {
				...store,
				rounds: [
					...store.rounds,
					{
						roundNumber: store.rounds.length + 1,
						matches: nextMatches
					}
				]
			};
		});
		addToast(`ROUND ${rounds.length + 1} BATTLE PLANS GENERATED.`);
	}

	function abandonTournament() {
		tournamentStore.set({ id: null, name: '', status: 'DRAFT', registeredPlayers: [], rounds: [] });
		goto('/tournaments');
	}
</script>

<div class="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-white/5 pb-8 relative z-20">
		<div class="relative">
			<div class="absolute -left-12 -top-12 w-48 h-48 bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"></div>
			<div class="flex items-center gap-4 mb-3 relative z-10">
				<span class="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] uppercase animate-pulse border-2 border-white/20">LIVE ARENA</span>
				<h1 class="text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase drop-shadow-md text-white">{$tournamentStore?.name}</h1>
			</div>
			<p class="text-violet-300 font-bold tracking-widest uppercase text-sm relative z-10">Select victors to advance the tournament tree.</p>
		</div>
		<div class="flex items-center gap-4 relative z-10">
			<Button variant="ghost" onclick={abandonTournament} class="text-text-muted hover:text-danger hover:bg-danger/20 font-black tracking-widest border-2 border-transparent hover:border-danger/30 px-6">ABORT EVENT</Button>
			<Button variant="secondary" onclick={simulateRemaining} class="hidden sm:inline-flex border-2 border-yellow-500/50 hover:border-yellow-400 text-yellow-400 hover:text-white" title="Randomize remaining unresolved matches">
				<Swords class="w-5 h-5 text-yellow-400 mr-2 group-hover:text-white" /> Simulate
			</Button>
			<Button onclick={advanceRound} variant="accent" size="lg" class="shadow-[0_0_30px_rgba(244,63,94,0.5)]">
				Advance Round <ArrowRight class="w-5 h-5 ml-2" />
			</Button>
		</div>
	</div>

	<!-- Bracket Canvas -->
	<div class="flex gap-16 overflow-x-auto min-h-[600px] custom-scrollbar px-6 pt-10 pb-20 relative z-10">
		
		<!-- Background Grid lines for style -->
		<div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

		{#each rounds as round, i (round.roundNumber)}
			<div class="min-w-[360px] flex-shrink-0 flex flex-col gap-8 relative z-10">
				
				<!-- Round Header -->
				<div class="flex items-center justify-center mb-4 sticky top-4 z-30">
					<div class="bg-surface/90 backdrop-blur-xl border-2 border-white/10 px-8 py-3 rounded-3xl shadow-xl flex items-center gap-4">
						<h3 class="font-black text-xl tracking-widest text-white uppercase drop-shadow-md">Tier {round.roundNumber}</h3>
						{#if i === rounds.length - 1}
							<div class="flex items-center gap-2">
								<div class="h-4 w-px bg-white/20"></div>
								<span class="text-[10px] text-emerald-400 font-black uppercase tracking-widest flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
									Active
								</span>
							</div>
						{/if}
					</div>
				</div>
				
				<!-- Matches Column -->
				<div class="flex-1 flex flex-col justify-around gap-8">
					{#each round.matches as match (match.id)}
						<div class="relative group/match">
							
							<!-- Extreme Neon Active Glow -->
							{#if i === rounds.length - 1 && !match.winnerId}
								<div class="absolute -inset-[3px] bg-gradient-to-r from-violet-600 to-rose-500 rounded-[28px] blur-lg group-hover/match:opacity-100 transition-opacity animate-pulse z-0 hidden lg:block"></div>
							{/if}
							
							<GlassCard padding="p-0" class="relative z-10 border-2 rounded-[24px] overflow-hidden flex flex-col transition-all duration-300
								{match.winnerId 
									? 'bg-black/60 border-white/5 opacity-50 backdrop-blur-none scale-[0.98]' 
									: 'bg-surface/90 border-white/20 shadow-2xl hover:-translate-y-1'
								}">
								
								<div class="absolute left-0 top-[50%] w-full h-px bg-white/10 z-20"></div>
								<div class="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 bg-surface border-2 border-white/10 px-3 py-1 rounded-full z-30 font-black text-[10px] text-white tracking-widest shadow-lg">VS</div>
								
								<!-- Player 1 -->
								<button 
									onclick={() => setWinner(i, match.id, match.player1Id)}
									disabled={i !== rounds.length - 1}
									class="w-full text-left p-5 pt-6 pb-8 flex items-center justify-between transition-colors relative group/btn overflow-hidden
										{match.winnerId === match.player1Id ? 'bg-emerald-500/20' : 'hover:bg-white/5'}"
								>
									<!-- Hover Shimmer -->
									<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
									
									<div class="flex items-center gap-4 relative z-10">
										<div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-inner transition-all duration-300
											{match.winnerId === match.player1Id 
												? 'bg-emerald-400 border-emerald-300 text-black shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-110' 
												: 'bg-surface border-white/20 text-white'}">
											{getPlayerName(match.player1Id).charAt(0).toUpperCase()}
										</div>
										<div>
											<p class="font-black text-xl tracking-tight transition-colors {match.winnerId === match.player1Id ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-white'}">{getPlayerName(match.player1Id)}</p>
											<p class="text-[10px] text-text-muted font-bold tracking-widest uppercase">{getPlayerElo(match.player1Id)} Base Elo</p>
										</div>
									</div>
									{#if match.winnerId === match.player1Id}
										<div class="bg-emerald-400 rounded-full p-1 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-bounce relative z-10">
											<Check class="w-5 h-5 text-black" />
										</div>
									{/if}
								</button>
								
								<!-- Player 2 -->
								<button 
									onclick={() => match.player2Id ? setWinner(i, match.id, match.player2Id) : null}
									disabled={!match.player2Id || i !== rounds.length - 1}
									class="w-full text-left p-5 pt-8 pb-6 flex items-center justify-between transition-colors relative group/btn overflow-hidden
										{match.winnerId === match.player2Id ? 'bg-emerald-500/20' : 'hover:bg-white/5'} 
										{!match.player2Id ? 'opacity-30 cursor-not-allowed bg-black/40' : ''}"
								>
									<!-- Hover Shimmer -->
									<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>

									<div class="flex items-center gap-4 relative z-10">
										<div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-inner transition-all duration-300
											{match.winnerId === match.player2Id 
												? 'bg-emerald-400 border-emerald-300 text-black shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-110' 
												: 'bg-surface border-white/20 text-white'}">
											{getPlayerName(match.player2Id).charAt(0).toUpperCase()}
										</div>
										<div>
											<p class="font-black text-xl tracking-tight transition-colors {match.winnerId === match.player2Id ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-white'}">{getPlayerName(match.player2Id)}</p>
											<p class="text-[10px] text-text-muted font-bold tracking-widest uppercase">{!match.player2Id ? 'Auto-Advance' : getPlayerElo(match.player2Id) + ' Base Elo'}</p>
										</div>
									</div>
									{#if match.winnerId === match.player2Id && match.player2Id}
										<div class="bg-emerald-400 rounded-full p-1 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-bounce relative z-10">
											<Check class="w-5 h-5 text-black" />
										</div>
									{/if}
								</button>
							</GlassCard>
						</div>
					{/each}
				</div>
				
				<!-- Connection UI for branching -->
				{#if i < rounds.length - 1}
					<div class="hidden lg:block absolute top-[50%] -right-16 w-16 h-1 bg-gradient-to-r from-violet-500/50 to-rose-500/50 z-0"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		height: 12px;
		width: 12px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(0,0,0,0.4);
		border-radius: 12px;
		border: 2px solid rgba(255,255,255,0.05);
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: linear-gradient(to right, #7C3AED, #F43F5E);
		border-radius: 12px;
	}
	.custom-scrollbar:hover::-webkit-scrollbar-thumb {
		background: linear-gradient(to right, #8B5CF6, #FB7185);
	}
</style>
