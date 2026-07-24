<script>
	import { fade, scale } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	let { open = $bindable(false), title = '', children, class: className = '' } = $props();

	function close() {
		open = false;
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
		<!-- Backdrop -->
		<div 
			class="absolute inset-0 bg-background/80 backdrop-blur-sm" 
			transition:fade={{ duration: 200 }} 
			onclick={close} 
			onkeydown={(e) => e.key === 'Escape' && close()} 
			role="button" 
			tabindex="0"
			aria-label="Close modal"
		></div>
		
		<!-- Modal Content -->
		<div 
			class="relative w-full max-w-md bg-surface/95 backdrop-blur-3xl border-2 border-white/10 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden {className}"
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
		>
			<!-- Top glass highlight -->
			<div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-rose-500/0"></div>
			
			<div class="flex items-center justify-between p-6 border-b-2 border-white/5 bg-black/20">
				<h3 class="text-xl font-black tracking-tighter uppercase drop-shadow-md text-white">{title}</h3>
				<button onclick={close} class="text-text-muted hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all hover:scale-110 hover:-rotate-90 group" aria-label="Close">
					<X class="w-5 h-5 group-hover:text-rose-400" />
				</button>
			</div>
			
			<div class="p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
