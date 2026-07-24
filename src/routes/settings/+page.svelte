<script>
	import { Settings, RefreshCw, Trash2, ShieldAlert } from 'lucide-svelte';
	import GlassCard from '../../components/ui/GlassCard.svelte';
	import Button from '../../components/ui/Button.svelte';
	import { addToast } from '../../store/toastStore.js';
	import { browser } from '$app/environment';

	let confirmText = $state('');

	function hardReset() {
		if (confirmText !== 'RESET') {
			addToast('Please type RESET in all caps to confirm.', 'error');
			return;
		}
		
		if (browser) {
			localStorage.removeItem('chessops_players');
			localStorage.removeItem('chessops_tournament');
			addToast('System reset completely. Rebooting...', 'success');
			setTimeout(() => {
				window.location.href = '/';
			}, 800);
		}
	}
</script>

<div class="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
	<div class="flex items-center gap-5 border-b border-white/5 pb-6">
		<div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
			<Settings class="w-7 h-7 text-text-muted" />
		</div>
		<div>
			<h1 class="text-3xl font-bold font-heading tracking-tight">System Settings</h1>
			<p class="text-text-muted mt-1 tracking-wide">Configure local storage persistence and dashboard preferences.</p>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8">
		<!-- Appearance Section -->
		<GlassCard padding="p-8" class="hover:border-white/20 transition-all duration-300">
			<h3 class="text-xl font-bold tracking-tight mb-3 flex items-center gap-3">
				<RefreshCw class="w-5 h-5 text-primary" /> Appearance Configuration
			</h3>
			<p class="text-sm text-text-muted mb-8 max-w-xl leading-relaxed">
				This application runs exclusively in Dark Mode to ensure high contrast, glare reduction, and optimal operator focus during intense tournament environments. Light mode is not supported for this SaaS tier.
			</p>
			
			<div class="flex items-center justify-between p-5 border border-white/5 bg-background/50 rounded-2xl shadow-inner">
				<div>
					<p class="font-bold text-lg">Dark Theme Engine</p>
					<p class="text-xs text-text-muted mt-1 font-bold tracking-widest uppercase">Locked at global component level</p>
				</div>
				<!-- CSS Toggle representation -->
				<div class="w-14 h-7 bg-primary rounded-full relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-not-allowed opacity-80">
					<div class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div>
				</div>
			</div>
		</GlassCard>

		<!-- Danger Zone Section -->
		<div class="relative group mt-6">
			<!-- Danger glow pulse -->
			<div class="absolute -inset-[1px] bg-danger/20 rounded-[20px] blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
			
			<GlassCard padding="p-8" class="relative z-10 border-danger/40 bg-danger/5 shadow-2xl">
				<h3 class="text-xl font-bold tracking-tight mb-3 text-danger flex items-center gap-3">
					<ShieldAlert class="w-6 h-6 animate-pulse" /> Danger Zone
				</h3>
				<p class="text-sm text-text-muted mb-8 max-w-2xl leading-relaxed">
					Permanently delete all registered players, match records, tournament history, and standing points from your browser's local storage database. <span class="text-danger font-bold">This action absolutely cannot be undone.</span>
				</p>

				<div class="flex flex-col sm:flex-row gap-5 items-end p-6 bg-black/20 rounded-2xl border border-danger/20">
					<div class="w-full sm:w-72">
						<label for="confirm" class="text-[10px] font-black text-danger/80 uppercase tracking-widest mb-2 block pl-1">Type RESET to verify destruction</label>
						<input 
							id="confirm"
							type="text" 
							bind:value={confirmText}
							placeholder="RESET" 
							class="w-full bg-background/90 border border-danger/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-danger focus:ring-2 focus:ring-danger/50 transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] font-mono tracking-widest font-bold placeholder-danger/30"
						/>
					</div>
					<Button variant="danger" onclick={hardReset} disabled={confirmText !== 'RESET'} class="flex-shrink-0 px-8 py-3.5 font-bold shadow-[0_4px_30px_rgba(239,68,68,0.5)]">
						<Trash2 class="w-5 h-5" />
						Purge Database
					</Button>
				</div>
			</GlassCard>
		</div>
	</div>
</div>
