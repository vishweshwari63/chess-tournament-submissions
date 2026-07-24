<script>
	import { Trophy, Medal, Star } from 'lucide-svelte';
	import GlassCard from '../../components/ui/GlassCard.svelte';
	import { rankedPlayers } from '../../store/playerStore.js';
</script>

<div class="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
	<div class="text-center space-y-4 pt-10 relative">
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-violet-600/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"></div>
		<h1 class="text-5xl md:text-7xl font-black font-heading tracking-tighter uppercase relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Global Ladder</h1>
		<p class="text-violet-300 font-bold tracking-widest uppercase text-sm md:text-base relative z-10">Only the strong survive.</p>
	</div>

	{#if $rankedPlayers.length >= 3}
		<!-- E-Sports Podium -->
		<div class="flex items-end justify-center gap-2 sm:gap-6 mt-48 h-[350px]">
			
			<!-- Silver (#2) -->
			<div class="flex flex-col items-center justify-end w-32 md:w-44 relative group hover:-translate-y-4 transition-transform duration-500 z-10">
				<!-- Glow -->
				<div class="absolute top-10 w-24 h-24 bg-slate-300/20 rounded-full blur-2xl"></div>
				
				<div class="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-400 border-4 border-slate-300 mb-4 z-10 shadow-[0_0_30px_rgba(203,213,225,0.5)] rotate-[-6deg] group-hover:rotate-0 transition-transform flex items-center justify-center text-slate-900 font-black text-3xl md:text-5xl">
					{$rankedPlayers[1].name.charAt(0).toUpperCase()}
				</div>
				<p class="font-black text-base md:text-lg text-center mb-1 line-clamp-1 w-full px-2 text-white">{$rankedPlayers[1].name}</p>
				<p class="text-xs text-slate-300 font-bold tracking-widest uppercase mb-4 py-1 px-3 bg-white/5 rounded-full border border-white/10">{$rankedPlayers[1].points} pts</p>
				
				<div class="w-full h-40 bg-gradient-to-b from-slate-700 to-surface border-2 border-slate-500 shadow-2xl flex items-start justify-center pt-6 rounded-t-3xl relative overflow-hidden group-hover:h-44 transition-all duration-500">
					<div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
					<span class="font-black text-5xl text-slate-100 drop-shadow-md relative z-10">2</span>
				</div>
			</div>

			<!-- Gold (#1) -->
			<div class="flex flex-col items-center justify-end w-40 md:w-56 relative group hover:-translate-y-6 transition-transform duration-500 z-30">
				<div class="absolute -top-16 z-30 animate-bounce" style="animation-duration: 3s;"><Trophy class="w-14 h-14 text-[#EAB308] drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] fill-[#EAB308]/40" /></div>
				
				<!-- Intense Sun Glow for #1 -->
				<div class="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-[40px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
				
				<div class="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-yellow-300 to-amber-500 border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.8)] mb-6 z-20 flex items-center justify-center text-amber-950 font-black text-5xl md:text-7xl">
					{$rankedPlayers[0].name.charAt(0).toUpperCase()}
				</div>
				<p class="font-black text-xl md:text-2xl text-center mb-1 line-clamp-1 w-full px-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20">{$rankedPlayers[0].name}</p>
				<p class="text-xs text-[#EAB308] font-black tracking-widest uppercase mb-4 py-1 px-4 bg-yellow-500/20 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.3)] z-20">{$rankedPlayers[0].points} pts</p>
				
				<div class="w-full h-56 bg-gradient-to-b from-yellow-600 to-surface border-2 border-yellow-500 shadow-2xl flex items-start justify-center pt-6 xl:pt-8 rounded-t-3xl relative overflow-hidden group-hover:h-64 transition-all duration-500 z-10">
					<div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]"></div>
					<span class="font-black text-6xl text-yellow-200 drop-shadow-lg relative z-10">1</span>
				</div>
			</div>

			<!-- Bronze (#3) -->
			<div class="flex flex-col items-center justify-end w-32 md:w-44 relative group hover:-translate-y-4 transition-transform duration-500 z-10">
				<!-- Glow -->
				<div class="absolute top-10 w-24 h-24 bg-[#D97706]/20 rounded-full blur-2xl"></div>
				
				<div class="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-amber-600 to-orange-800 border-4 border-amber-700 shadow-[0_0_30px_rgba(180,83,9,0.4)] mb-4 z-10 rotate-[6deg] group-hover:rotate-0 transition-transform flex items-center justify-center text-orange-100 font-black text-3xl md:text-5xl">
					{$rankedPlayers[2].name.charAt(0).toUpperCase()}
				</div>
				<p class="font-black text-base md:text-lg text-center mb-1 line-clamp-1 w-full px-2 text-white">{$rankedPlayers[2].name}</p>
				<p class="text-xs text-[#D97706] font-bold tracking-widest uppercase mb-4 py-1 px-3 bg-white/5 rounded-full border border-white/10">{$rankedPlayers[2].points} pts</p>
				
				<div class="w-full h-32 bg-gradient-to-b from-[#78350F] to-surface border-2 border-[#D97706] shadow-2xl flex items-start justify-center pt-6 rounded-t-3xl relative overflow-hidden group-hover:h-36 transition-all duration-500">
					<div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_reverse]"></div>
					<span class="font-black text-4xl text-[#FBBF24]/90 drop-shadow-md relative z-10">3</span>
				</div>
			</div>
		</div>
	{:else if $rankedPlayers.length > 0}
		<!-- Fallback if there are players but less than 3 -->
		<div class="h-32"></div>
	{/if}

	<!-- Full Roster Table (Minus Top 3 if they exist) -->
	{#if $rankedPlayers.length > 0}
		<div class="max-w-4xl mx-auto mt-12 bg-surface/80 border-2 border-white/10 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-3xl relative">
			<!-- Visual flair bar -->
			<div class="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-600 via-rose-500 to-yellow-500 z-10"></div>
			
			<div class="w-full relative z-0">
				<!-- Table Header -->
				<div class="hidden sm:flex items-center gap-6 p-6 border-b-2 border-white/5 bg-black/40 text-[10px] font-black text-text-muted uppercase tracking-widest">
					<div class="w-16 text-center">Rank</div>
					<div class="flex-1 pl-4">Challenger Profile</div>
					<div class="text-right w-32 pr-2">Win Ratio</div>
					<div class="text-right w-40 pr-6">Lifetime Points</div>
				</div>

				<!-- Table Body -->
				<div class="divide-y-2 divide-white/5">
					{#each $rankedPlayers as player, i (player.id)}
						<!-- In E-Sports style, only show 4+ since 1,2,3 are on podium. Wait, keeping top 3 in list acts as dual-confirmation. Let's keep them and highlight them! -->
						<div class="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 hover:bg-white/5 transition-all duration-300 group {i === 0 ? 'bg-yellow-500/10' : i === 1 ? 'bg-slate-300/5' : i === 2 ? 'bg-amber-600/5' : ''}">
							<!-- Rank Number -->
							<div class="font-black text-2xl w-10 sm:w-16 text-center drop-shadow-md flex items-center justify-center
								{i === 0 ? 'text-[#EAB308]' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-[#D97706]' : 'text-text-muted/30 group-hover:text-primary transition-colors'}">
								{#if i === 0}<Trophy class="w-6 h-6 mr-1 hidden sm:block" />{/if}
								#{i + 1}
							</div>
							
							<!-- Player Info -->
							<div class="flex items-center gap-4 flex-1">
								<div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black shadow-lg
									{i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)] rotate-3' 
									: i === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-200 border-2 border-white text-slate-800 shadow-[0_0_15px_rgba(203,213,225,0.4)]' 
									: i === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-400 border-2 border-amber-300 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]' 
									: 'bg-white/5 border border-white/20 text-white group-hover:-rotate-6 transition-transform'} text-xl">
									{player.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<h4 class="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-rose-400 transition-all">{player.name}</h4>
									<div class="flex items-center gap-3 mt-1">
										<p class="text-[10px] text-text-muted font-bold uppercase tracking-widest">{player.elo} BASE</p>
										{#if i === 0}
											<div class="w-1.5 h-1.5 rounded-full bg-white/20"></div>
											<Star class="w-3 h-3 text-[#EAB308] fill-[#EAB308]" />
										{/if}
									</div>
								</div>
							</div>
							
							<!-- Stats -->
							<div class="text-right hidden sm:block w-32 border-r-2 border-white/5 pr-6">
								<p class="font-black text-[15px]">{player.wins}W - {player.losses}L</p>
								<p class="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-widest">{player.wins + player.losses > 0 ? Math.round((player.wins / (player.wins + player.losses)) * 100) : 0}% WIN RT</p>
							</div>
							
							<div class="text-right w-24 sm:w-40 sm:pr-8">
								<p class="font-black text-white font-mono text-2xl sm:text-4xl tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] {i === 0 ? 'text-[#EAB308]' : ''}">{player.points}</p>
								<p class="text-[9px] sm:text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Total Pts</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="p-16 max-w-2xl mx-auto mt-20 text-center border-4 border-dashed border-white/10 rounded-[40px] bg-surface/30">
			<Trophy class="w-20 h-20 mx-auto mb-6 text-white/20" />
			<h3 class="text-3xl font-black tracking-tight mb-4 text-white uppercase">Ladder Offline</h3>
			<p class="text-text-muted font-medium text-lg leading-relaxed">The global ladder requires completed tournaments to forge ranking data. Send players into the arena to begin populating stats.</p>
		</div>
	{/if}
</div>
