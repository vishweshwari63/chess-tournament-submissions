<script>
	let { value = $bindable(), id, type = 'text', placeholder, label, class: className = '' } = $props();
</script>

<div class="flex flex-col gap-2 {className}">
	{#if label}
		<label for={id} class="text-[10px] font-black text-violet-300 uppercase tracking-widest ml-1">{label}</label>
	{/if}
	<input 
		{id} 
		{type} 
		bind:value
		{placeholder}
		class="w-full bg-black/40 border-2 border-white/5 rounded-2xl px-5 py-3.5 text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-inner"
	/>
</div>
