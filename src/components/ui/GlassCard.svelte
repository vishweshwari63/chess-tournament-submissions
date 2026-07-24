<script>
	let { children, class: className = '', padding = 'p-6', glow = false } = $props();
</script>

<div class="relative group {className}">
	<!-- Optional outer neon glow on hover -->
	{#if glow}
		<div class="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-rose-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
	{/if}
	
	<div class="relative h-full overflow-hidden rounded-3xl border-2 border-white/5 bg-surface shadow-2xl {padding} backdrop-blur-xl transition-all duration-300">
		<!-- Diagonal glossy shine -->
		<div class="absolute -inset-full top-0 z-0 block h-[200%] w-[50%] -rotate-45 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[400%]"></div>
		
		<div class="relative z-10">
			{@render children()}
		</div>
	</div>
</div>
