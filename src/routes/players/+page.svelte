<script>
	import { Search, Plus, User, MoreVertical, Edit, Trash2 } from 'lucide-svelte';
	import GlassCard from '../../components/ui/GlassCard.svelte';
	import Button from '../../components/ui/Button.svelte';
	import Input from '../../components/ui/Input.svelte';
	import Modal from '../../components/ui/Modal.svelte';
	import { playerStore } from '../../store/playerStore.js';
	import { addToast } from '../../store/toastStore.js';

	let searchQuery = $state('');
	
	let modalOpen = $state(false);
	let editId = $state(null);
	let formName = $state('');
	let formElo = $state(1500);

	let filteredPlayers = $derived(
		$playerStore.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function openAddModal() {
		editId = null;
		formName = '';
		formElo = 1500;
		modalOpen = true;
	}

	function openEditModal(player) {
		editId = player.id;
		formName = player.name;
		formElo = player.elo;
		modalOpen = true;
	}

	function savePlayer() {
		if (!formName.trim()) {
			addToast('Player name is required!', 'error');
			return;
		}

		if (editId) {
			playerStore.update(players => players.map(p => 
				p.id === editId ? { ...p, name: formName, elo: formElo } : p
			));
			addToast('Player records updated.', 'success');
		} else {
			playerStore.update(players => [
				...players, 
				{ 
					id: Math.random().toString(36).substr(2, 9), 
					name: formName.trim(), 
					elo: formElo || 1500,
					wins: 0,
					losses: 0,
					points: 0,
					avatarUrl: ''
				}
			]);
			addToast('New player drafted to roster!', 'success');
		}
		modalOpen = false;
	}

	function deletePlayer(id) {
		playerStore.update(players => players.filter(p => p.id !== id));
		addToast('Player removed from system.', 'error');
	}
</script>

<div class="max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
	<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b-2 border-white/5 pb-6">
		<div class="relative">
			<div class="absolute -left-12 -top-12 w-32 h-32 bg-rose-500/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
			<h1 class="text-4xl md:text-5xl font-black font-heading tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-500 pb-1">FIGHTER ROSTER</h1>
			<p class="text-text-muted mt-2 tracking-widest uppercase font-bold text-sm">Manage participants and their base ratings</p>
		</div>
		<div class="flex items-center gap-4">
			<div class="relative w-full sm:w-72 group">
				<Search class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-rose-500 transition-colors" />
				<input 
					type="text" 
					bind:value={searchQuery}
					placeholder="Search fighters..." 
					class="w-full bg-surface border-2 border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-all font-bold text-white shadow-inner placeholder-white/30"
				/>
			</div>
			<Button variant="accent" onclick={openAddModal} class="whitespace-nowrap px-6 py-3">
				<Plus class="w-5 h-5" />
				Draft Player
			</Button>
		</div>
	</div>

	{#if filteredPlayers.length === 0}
		<div class="flex flex-col items-center justify-center p-16 text-center border-4 border-white/5 rounded-3xl bg-surface/30 border-dashed relative overflow-hidden">
			<div class="absolute inset-0 bg-gradient-to-b from-transparent to-rose-500/5 opacity-50"></div>
			<div class="w-24 h-24 rounded-3xl bg-rose-500/20 flex flex-col items-center justify-center mb-6 border-2 border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.3)] rotate-3">
				<User class="w-12 h-12 text-rose-500" />
			</div>
			<h3 class="text-2xl font-black mb-2 tracking-tight uppercase text-white drop-shadow-md">No Fighters Found</h3>
			<p class="text-text-muted mb-8 max-w-sm font-medium">Your roster is currently empty or no players match your search criteria.</p>
			<Button variant="accent" size="lg" onclick={openAddModal}>
				<Plus class="w-5 h-5" />
				Draft First Player
			</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 pt-2 pb-6">
			{#each filteredPlayers as player (player.id)}
				<div class="relative group h-full">
					<!-- Glow -->
					<div class="absolute -inset-1 bg-gradient-to-r from-violet-600 to-rose-500 rounded-3xl blur-md opacity-20 group-hover:opacity-70 transition-opacity duration-300"></div>
					
					<GlassCard padding="p-0" class="relative z-10 flex flex-col h-full border-2 border-white/10 group-hover:scale-[1.02] transition-transform duration-300 overflow-visible bg-surface/90 pb-6 rounded-3xl">
						<div class="flex items-start justify-between p-5 pb-0">
							<!-- 3D Avatar -->
							<div class="w-16 h-16 -mt-8 rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 p-1 flex items-center justify-center shadow-[0_10px_20px_rgba(244,63,94,0.4)] rotate-3 group-hover:-rotate-3 transition-transform duration-300">
								<div class="w-full h-full bg-surface border-2 border-surface rounded-xl flex items-center justify-center font-black text-2xl text-white">
									{player.name.charAt(0).toUpperCase()}
								</div>
							</div>
							
							<div class="flex items-center gap-2">
								<button onclick={() => openEditModal(player)} class="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/20 hover:bg-violet-500 text-violet-300 hover:text-white border border-violet-500/30 transition-all z-10 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)]" title="Edit Fighter">
									<Edit class="w-4 h-4" />
								</button>
								<button onclick={() => deletePlayer(player.id)} class="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all z-10 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.6)]" title="Terminate Fighter">
									<Trash2 class="w-4 h-4" />
								</button>
							</div>
						</div>
						
						<div class="px-5 pt-3">
							<h3 class="font-black text-2xl tracking-tighter text-white drop-shadow-sm mb-1">{player.name}</h3>
							<div class="bg-white/10 inline-block px-3 py-1 rounded-full border border-white/5 mb-6">
								<p class="text-[10px] text-white/80 font-black tracking-widest uppercase">Base Elo: <span class="text-rose-400">{player.elo}</span></p>
							</div>
							
							<div class="grid grid-cols-2 gap-4 mt-auto border-t-2 border-white/5 pt-5">
								<div class="bg-black/30 rounded-xl p-3 text-center border border-white/5">
									<p class="font-black text-2xl text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">{player.wins}</p>
									<p class="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">Wins</p>
								</div>
								<div class="bg-black/30 rounded-xl p-3 text-center border border-white/5">
									<p class="font-black text-2xl text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]">{player.losses}</p>
									<p class="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">Losses</p>
								</div>
							</div>
						</div>
					</GlassCard>
				</div>
			{/each}
		</div>
	{/if}
</div>

<Modal bind:open={modalOpen} title={editId ? "UPDATE FIGHTER" : "DRAFT NEW FIGHTER"}>
	<div class="space-y-6">
		<Input id="name" label="FIGHTER ALIAS" bind:value={formName} placeholder="e.g. Magnus The Boss" />
		<Input id="elo" type="number" label="BASE ELO POWER LEVEL" bind:value={formElo} />
		
		<div class="flex items-center justify-end gap-3 pt-6 border-t-2 border-white/5 mt-8">
			<Button variant="ghost" onclick={() => (modalOpen = false)} class="font-bold">ABORT</Button>
			<Button variant={editId ? "primary" : "accent"} onclick={savePlayer} class="min-w-[140px]">
				{editId ? 'COMMIT CHANGES' : 'CONFIRM DRAFT'}
			</Button>
		</div>
	</div>
</Modal>
