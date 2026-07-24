<script>
	let { children, variant = 'primary', size = 'md', class: className = '', type = 'button', onclick, disabled = false } = $props();

	const baseClasses = "relative inline-flex items-center gap-2 justify-center font-bold tracking-wide transition-all duration-300 active:scale-90 disabled:opacity-50 disabled:pointer-events-none rounded-2xl overflow-hidden before:absolute before:inset-0 before:transition-all before:duration-300";
	
	const variants = {
		primary: "text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:-translate-y-1",
		secondary: "bg-surface border-2 border-white/10 text-white hover:border-white/30 hover:bg-white/5 hover:-translate-y-1",
		accent: "text-white bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.8)] hover:-translate-y-1 outline outline-2 outline-offset-2 outline-rose-500/50",
		danger: "text-white bg-red-500 hover:bg-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
		ghost: "bg-transparent text-text-muted hover:text-white hover:bg-white/10"
	};

	const sizes = {
		sm: "px-4 py-2 text-xs",
		md: "px-6 py-3 text-sm",
		lg: "px-8 py-4 text-lg uppercase tracking-wider"
	};
</script>

<button 
	{type}
	{disabled}
	class="{baseClasses} {variants[variant]} {sizes[size]} {className}" 
	{onclick}
>
	<!-- Shimmer shine effect for colorful buttons -->
	{#if variant === 'primary' || variant === 'accent'}
		<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] hover:animate-[shimmer_1s_ease-in-out]"></div>
	{/if}
	<span class="relative z-10 flex items-center gap-2 drop-shadow-sm">
		{@render children()}
	</span>
</button>

<style>
	@keyframes shimmer {
		100% {
			transform: translateX(150%);
		}
	}
</style>
