<script>
	import { Trophy, Users, CheckCircle2, Activity, Play } from 'lucide-svelte';
	import GlassCard from '../components/ui/GlassCard.svelte';
	import Button from '../components/ui/Button.svelte';
	import { playerStore, rankedPlayers } from '../store/playerStore.js';
	import { tournamentStore } from '../store/tournamentStore.js';

	let totalPlayers = $derived($playerStore.length);
	let activeTournaments = $derived($tournamentStore.id && $tournamentStore.status !== 'COMPLETE' ? 1 : 0);
	let completedMatches = $derived(
		$tournamentStore.rounds?.flatMap(r => r.matches).filter(m => m.winnerId).length || 12
	);
	
	let champion = $derived($rankedPlayers[0]);
</script>

<div class="space-y-10 animate-in fade-in zoom-in-95 duration-500">
	<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
		<div class="relative">
			<div class="absolute -left-12 -top-12 w-32 h-32 bg-violet-600/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
			<h1 class="text-5xl font-black font-heading tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 pb-1">DASHBOARD</h1>
			<p class="text-text-muted mt-1 font-bold tracking-widest uppercase text-sm">Welcome to the Arena.</p>
		</div>
		<a href="/tournaments" class="relative group inline-block">
			<div class="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
			<Button variant="accent" size="lg" class="w-full sm:w-auto z-10">
				<Play class="w-5 h-5 fill-white" />
				Marmalade Start
			</Button>
		</a>
	</div>

	<!-- Vibrant Metric Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<GlassCard padding="p-6" glow={true} class="hover:-translate-y-2 transition-transform duration-500">
			<div class="flex items-center gap-5">
				<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
					<Users class="w-8 h-8 text-white drop-shadow-md" />
				</div>
				<div>
					<p class="text-xs text-violet-300 font-black tracking-widest uppercase mb-1 drop-shadow-sm">Total Players</p>
					<p class="text-4xl font-black tracking-tighter text-white">{totalPlayers}</p>
				</div>
			</div>
		</GlassCard>

		<GlassCard padding="p-6" class="border-rose-500/20 hover:border-rose-500/50 hover:-translate-y-2 transition-transform duration-500">
			<div class="flex items-center gap-5">
				<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
					<Activity class="w-8 h-8 text-white drop-shadow-md" />
				</div>
				<div>
					<p class="text-xs text-rose-300 font-black tracking-widest uppercase mb-1 drop-shadow-sm">Active Events</p>
					<p class="text-4xl font-black tracking-tighter text-white">{activeTournaments}</p>
				</div>
			</div>
		</GlassCard>

		<GlassCard padding="p-6" class="border-emerald-500/20 hover:border-emerald-500/50 hover:-translate-y-2 transition-transform duration-500">
			<div class="flex items-center gap-5">
				<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
					<CheckCircle2 class="w-8 h-8 text-white drop-shadow-md" />
				</div>
				<div>
					<p class="text-xs text-emerald-300 font-black tracking-widest uppercase mb-1 drop-shadow-sm">Matches Played</p>
					<p class="text-4xl font-black tracking-tighter text-white">{completedMatches}</p>
				</div>
			</div>
		</GlassCard>

		<GlassCard padding="p-6" class="border-blue-500/20 hover:border-blue-500/50 hover:-translate-y-2 transition-transform duration-500">
			<div class="flex items-center gap-5">
				<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
					<Trophy class="w-8 h-8 text-white drop-shadow-md" />
				</div>
				<div>
					<p class="text-xs text-blue-300 font-black tracking-widest uppercase mb-1 drop-shadow-sm">System Status</p>
					<p class="text-3xl font-black tracking-tighter text-white uppercase pt-1">Online</p>
				</div>
			</div>
		</GlassCard>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
		<GlassCard class="lg:col-span-2">
			<h3 class="text-2xl font-black mb-6 tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Live Activity Feed</h3>
			<div class="space-y-6">
				<div class="flex gap-5 relative group bg-surface-hover/50 p-4 rounded-2xl border-2 border-transparent hover:border-white/10 transition-colors">
					<div class="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 border-2 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform">
						<Trophy class="w-5 h-5 text-violet-400" />
					</div>
					<div class="flex-1">
						<p class="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">Global Arena Opened</p>
						<p class="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">2 hours ago</p>
					</div>
				</div>
				
				<div class="flex gap-5 relative group bg-surface-hover/50 p-4 rounded-2xl border-2 border-transparent hover:border-white/10 transition-colors">
					<div class="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0 border-2 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:scale-110 transition-transform">
						<CheckCircle2 class="w-5 h-5 text-rose-400" />
					</div>
					<div class="flex-1">
						<p class="font-bold text-lg text-white block max-w-sm leading-tight">
							<span class="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]">{champion?.name || 'Player 1'}</span> emerged victorious over <span class="text-white/60">Player 2</span>
						</p>
						<p class="text-xs text-text-muted font-bold tracking-widest uppercase mt-2 text-rose-300/50">3 hours ago</p>
					</div>
				</div>
			</div>
		</GlassCard>

		<div class="relative group h-full">
			<!-- Insane Glow backdrop for MVP -->
			<div class="absolute -inset-2 bg-gradient-to-tr from-yellow-400 via-orange-500 to-rose-500 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 group-hover:rotate-1 animate-pulse transition-all duration-1000 z-0"></div>
			
			<div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-12 bg-surface/95 border-4 border-yellow-500/50 hover:border-yellow-400 transition-colors rounded-[32px] shadow-2xl overflow-visible mt-4">
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-1.5 rounded-full text-xs font-black tracking-widest border-2 border-black shadow-[0_0_20px_rgba(250,204,21,0.6)] uppercase whitespace-nowrap z-20">
					Current Champion
				</div>
				
				<!-- 3D style Avatar -->
				<div class="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 p-1 mb-6 shadow-[0_10px_40px_rgba(234,179,8,0.6)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 rotate-3 cursor-pointer mt-2 relative z-10">
					<div class="w-full h-full rounded-2xl bg-surface border-4 border-surface overflow-hidden flex items-center justify-center group-hover:-rotate-3 transition-transform duration-500">
						<Users class="w-14 h-14 text-white/50" />
					</div>
				</div>
				
				{#if champion}
					<h2 class="text-3xl font-black tracking-tighter text-white mb-2 drop-shadow-md z-10 relative">{champion.name}</h2>
					<div class="flex items-center justify-center gap-2 mb-6 z-10 relative">
						<div class="bg-white/10 rounded-full px-3 py-1 font-mono font-bold text-xs text-yellow-400">
							{champion.elo} MMB
						</div>
					</div>
					
					<div class="flex items-center justify-center gap-8 mt-auto w-full bg-black/40 rounded-2xl p-4 border-2 border-white/5 z-10 relative">
						<div class="text-center flex-1">
							<p class="text-4xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">{champion.wins}</p>
							<p class="text-[10px] text-emerald-400/60 uppercase tracking-widest font-black mt-1">Wins</p>
						</div>
						<div class="w-1 h-12 bg-white/10 rounded-full"></div>
						<div class="text-center flex-1">
							<p class="text-4xl font-black text-rose-500 tracking-tighter drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">{champion.losses}</p>
							<p class="text-[10px] text-rose-500/60 uppercase tracking-widest font-black mt-1">Losses</p>
						</div>
					</div>
				{:else}
					<p class="text-text-muted font-bold tracking-widest uppercase mt-8 text-sm relative z-10">Awaiting Challenger</p>
				{/if}
			</div>
		</div>
	</div>
</div>
