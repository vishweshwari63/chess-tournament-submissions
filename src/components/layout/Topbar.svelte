<script>
	import { Bell, Search } from 'lucide-svelte';
	import { page } from '$app/stores';

	let currentPath = $derived($page.url.pathname);
	let breadcrumb = $derived(
		currentPath === '/' ? 'Dashboard' 
		: currentPath.startsWith('/players') ? 'Players'
		: currentPath.startsWith('/tournaments') ? 'Tournaments'
		: currentPath.startsWith('/rankings') ? 'Rankings'
		: currentPath.startsWith('/settings') ? 'Settings'
		: 'Overview'
	);
</script>

<header class="h-20 bg-transparent flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
	<div class="flex items-center gap-3 bg-surface/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-white/5 shadow-lg">
		<span class="text-sm font-bold text-text-muted uppercase tracking-widest">Base / <span class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{breadcrumb}</span></span>
	</div>

	<div class="flex items-center gap-4 bg-surface/80 backdrop-blur-md px-4 py-3 rounded-2xl border-2 border-white/5 shadow-lg">
		<div class="relative hidden sm:block">
			<Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
			<input type="text" placeholder="Quick search..." class="bg-background border-2 border-white/5 rounded-xl pl-11 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-primary/50 transition-colors font-bold text-white placeholder-text-muted" />
		</div>
		
		<div class="w-[2px] h-6 bg-white/10 mx-2"></div>
		
		<button class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 text-text-muted hover:text-white transition-all hover:scale-110 relative">
			<Bell class="w-5 h-5" />
			<span class="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-surface animate-pulse"></span>
		</button>
		
		<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-rose-500 overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.4)] border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer">
			<!-- Avatar placeholder -->
		</div>
	</div>
</header>
