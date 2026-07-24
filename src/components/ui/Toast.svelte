<script>
	import { fly, fade } from 'svelte/transition';
	import { toasts, removeToast } from '../../store/toastStore.js';
	import { CheckCircle2, AlertCircle, X } from 'lucide-svelte';
</script>

<div class="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
	{#each $toasts as toast (toast.id)}
		<div 
			transition:fly={{ y: 20, duration: 300 }}
			class="pointer-events-auto flex items-start gap-3 w-80 p-4 rounded-xl border backdrop-blur-xl shadow-lg 
				{toast.type === 'success' ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'}"
		>
			<div class="mt-0.5">
				{#if toast.type === 'success'}
					<CheckCircle2 class="w-5 h-5 text-success" />
				{:else}
					<AlertCircle class="w-5 h-5 text-danger" />
				{/if}
			</div>
			
			<div class="flex-1 text-sm font-medium pt-0.5 text-text-main">
				{toast.message}
			</div>
			
			<button onclick={() => removeToast(toast.id)} class="text-white/50 hover:text-white transition-colors" aria-label="Close toast">
				<X class="w-4 h-4" />
			</button>
		</div>
	{/each}
</div>
