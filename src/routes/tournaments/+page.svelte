<script>
	import { Trophy, ArrowRight, UserPlus, Trash2, ArrowRightLeft, Swords } from 'lucide-svelte';
	import Button from '../../components/ui/Button.svelte';
	import GlassCard from '../../components/ui/GlassCard.svelte';
	import Input from '../../components/ui/Input.svelte';
	import { tournamentStore } from '../../store/tournamentStore.js';
	import { playerStore } from '../../store/playerStore.js';
	import { addToast } from '../../store/toastStore.js';
	import { goto } from '$app/navigation';
	import { generatePairings } from '../../lib/algorithms/matchmaking.js';
	import { onMount } from 'svelte';

	let tournamentName = $state($tournamentStore?.name || '');
	let selectedPlayerIds = $state([...($tournamentStore?.registeredPlayers || [])]);

	let availablePlayers = $derived($playerStore.filter(p => !selectedPlayerIds.includes(p.id)));
	let registeredPlayers = $derived($playerStore.filter(p => selectedPlayerIds.includes(p.id)));

	onMount(() => {
		if ($tournamentStore?.status === 'ACTIVE') {
			goto('/tournaments/active', { replaceState: true });
		}
	});

	function startTournament() {
		if (!tournamentName.trim()) {
			addToast('Tournament name is required.', 'error');
			return;
		}
		if (selectedPlayerIds.length < 2) {
			addToast('Minimum 2 players required to begin.', 'error');
			return;
		}

		const initialMatches = generatePairings(selectedPlayerIds);
		
		tournamentStore.set({
			id: Math.random().toString(36).substr(2, 9),
			name: tournamentName,
			status: 'ACTIVE',
			registeredPlayers: selectedPlayerIds,
			rounds: [{
				roundNumber: 1,
				matches: initialMatches
			}]
		});
		
		addToast('Tournament initialized and paired!', 'success');
		goto('/tournaments/active');
	}

	function addPlayer(id) {
		selectedPlayerIds = [...selectedPlayerIds, id];
	}

	function removePlayer(id) {
		selectedPlayerIds = selectedPlayerIds.filter(pId => pId !== id);
	}
	
	function addAll() {
		const newIds = availablePlayers.map(p => p.id);
		selectedPlayerIds = [...selectedPlayerIds, ...newIds];
	}

	function removeAll() {
		selectedPlayerIds = [];
	}
</script>

<div class="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500 pb-16">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-white/5 pb-8">
		<div class="relative">
			<div class="absolute -left-16 -top-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none z-0"></div>
			<h1 class="text-4xl md:text-5xl font-black font-heading tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 pb-1 relative z-10">EVENT FORGE</h1>
			<p class="text-text-muted mt-2 tracking-widest uppercase font-bold text-sm relative z-10">Configure parameters and assemble your champions</p>
		</div>
		<Button variant="accent" onclick={startTournament} class="whitespace-nowrap px-8 py-3.5 text-lg font-black tracking-widest uppercase shadow-[0_0_40px_rgba(244,63,94,0.6)]">
			<Swords class="w-6 h-6 mr-1" />
			Generate Bracket
		</Button>
	</div>

	<GlassCard padding="p-8" class="border-2 border-white/10 shadow-2xl relative overflow-hidden">
		<!-- Diagonal glossy shine -->
		<div class="absolute -inset-full top-0 z-0 block h-[200%] w-[50%] -rotate-45 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
		
		<div class="max-w-2xl relative z-10">
			<h3 class="text-2xl font-black mb-6 tracking-tighter uppercase text-white">Match Configuration</h3>
			<Input id="tournamentName" label="EVENT TITLE DESIGNATION" placeholder="e.g. Winter Open Championship" bind:value={tournamentName} class="mb-6 font-bold" />
			<div class="flex items-center gap-3 mt-4 text-sm font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
				<div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
				GAMEMODE INITIATED: RANDOM ASSAULT (SINGLE ELIMINATION)
			</div>
		</div>
	</GlassCard>

	<div>
		<h3 class="text-3xl font-black mb-6 tracking-tighter uppercase text-white drop-shadow-md">Compile Roster</h3>
		
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
			
			<!-- Available Players -->
			<GlassCard padding="p-0" class="flex flex-col h-[500px] border-2 border-white/10 overflow-hidden">
				<div class="flex items-center justify-between p-5 pb-4 border-b-2 border-white/5 bg-black/40">
					<h4 class="font-black text-text-muted uppercase tracking-widest text-sm drop-shadow-sm">Available Fleet ({availablePlayers.length})</h4>
					{#if availablePlayers.length > 0}
						<button onclick={addAll} class="text-xs text-primary hover:text-white font-black uppercase tracking-widest transition-colors bg-primary/20 px-3 py-1 rounded-full border border-primary/30">Select All</button>
					{/if}
				</div>
				
				<div class="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar bg-surface/30">
					{#each availablePlayers as player (player.id)}
						<div class="flex items-center justify-between p-3 rounded-2xl border-2 border-white/5 bg-surface hover:bg-white/5 hover:border-violet-500/50 transition-all duration-300 group hover:scale-[1.02]">
							<div class="flex items-center gap-4">
								<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center font-black text-white shadow-inner border border-white/20">
									{player.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<p class="font-black text-base tracking-tight text-white">{player.name}</p>
									<p class="text-[10px] text-violet-300 font-bold tracking-widest uppercase">{player.elo} POWER</p>
								</div>
							</div>
							<button onclick={() => addPlayer(player.id)} class="text-text-muted group-hover:text-emerald-400 p-2.5 bg-black/30 group-hover:bg-emerald-500/20 rounded-xl transition-colors border border-white/5 group-hover:border-emerald-500/30">
								<ArrowRight class="w-5 h-5 hidden lg:block" />
								<UserPlus class="w-5 h-5 lg:hidden" />
							</button>
						</div>
					{:else}
						<div class="h-full flex flex-col items-center justify-center text-text-muted p-8 text-center border-2 border-dashed border-white/10 rounded-3xl m-2">
							<p class="font-black uppercase tracking-widest text-white/30 text-lg">Fleet Empty</p>
						</div>
					{/each}
				</div>
			</GlassCard>
			
			<!-- Desktop Direction Indicator -->
			<div class="hidden lg:flex flex-col items-center justify-center">
				<div class="w-14 h-14 rounded-2xl border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(124,58,237,0.3)] rotate-45 hover:rotate-180 transition-transform duration-700">
					<ArrowRightLeft class="w-6 h-6 -rotate-45" />
				</div>
			</div>

			<!-- Registered Players -->
			<GlassCard padding="p-0" class="flex flex-col h-[500px] border-2 border-rose-500/30 overflow-hidden shadow-[0_0_30px_rgba(244,63,94,0.1)] relative">
				<!-- Background glow -->
				<div class="absolute inset-0 bg-rose-500/5 mix-blend-overlay pointer-events-none"></div>
				
				<div class="flex items-center justify-between p-5 pb-4 border-b-2 border-rose-500/20 bg-rose-950/40 relative z-10">
					<h4 class="font-black text-rose-400 uppercase tracking-widest text-sm drop-shadow-sm">Combatants Selected ({registeredPlayers.length})</h4>
					{#if registeredPlayers.length > 0}
						<button onclick={removeAll} class="text-xs text-danger hover:text-white font-black tracking-widest uppercase transition-colors bg-danger/20 border border-danger/30 px-3 py-1 rounded-full">Flush</button>
					{/if}
				</div>
				
				<div class="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar bg-black/20 relative z-10">
					{#each registeredPlayers as player (player.id)}
						<div class="flex items-center justify-between p-3 rounded-2xl border-2 border-rose-500/30 bg-rose-950/40 hover:bg-rose-500/20 transition-all duration-300 group hover:scale-[1.02] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
							<div class="flex items-center gap-4">
								<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center font-black text-white shadow-inner border border-white/20">
									{player.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<p class="font-black text-base tracking-tight text-white drop-shadow-md">{player.name}</p>
									<p class="text-[10px] text-rose-300 font-bold tracking-widest uppercase">Locked In</p>
								</div>
							</div>
							<button onclick={() => removePlayer(player.id)} class="text-rose-400 group-hover:text-white p-2.5 bg-danger/20 group-hover:bg-danger rounded-xl transition-colors border border-danger/30">
								<Trash2 class="w-5 h-5 hidden lg:block" />
								<Trash2 class="w-5 h-5 lg:hidden" />
							</button>
						</div>
					{:else}
						<div class="h-full flex flex-col items-center justify-center text-rose-500/50 p-8 text-center border-2 border-rose-500/20 border-dashed rounded-3xl m-2 bg-rose-500/5">
							<UserPlus class="w-12 h-12 mb-4 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
							<p class="text-sm font-black uppercase tracking-widest text-rose-400/80">Draft players from the fleet to build your tournament bracket</p>
						</div>
					{/each}
				</div>
			</GlassCard>
			
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for limits */
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
	}
	.custom-scrollbar:hover::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
	}
</style>
