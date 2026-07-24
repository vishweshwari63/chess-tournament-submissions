<script>
	import { Trophy, Users, LayoutDashboard, Settings, Medal } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<aside class="fixed inset-y-0 left-0 w-64 bg-surface/90 backdrop-blur-xl border-r-2 border-white/5 flex flex-col z-50">
	<div class="p-6 flex items-center gap-4 border-b-2 border-white/5">
		<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] rotate-3 hover:rotate-12 transition-transform cursor-pointer">
			<Trophy class="w-6 h-6 text-white drop-shadow-md" />
		</div>
		<span class="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">ChessOps</span>
	</div>

	<nav class="flex-1 px-4 flex flex-col gap-3 mt-6">
		<a href="/" class="group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold {$page.url.pathname === '/' ? 'bg-gradient-to-r from-violet-600/20 to-transparent text-white border-l-4 border-violet-500' : 'text-text-muted hover:text-white hover:bg-white/5 hover:-translate-y-1 block'}">
			<LayoutDashboard class="w-5 h-5 {$page.url.pathname === '/' ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : ''}" />
			Dashboard
		</a>
		<a href="/players" class="group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold {$page.url.pathname.startsWith('/players') ? 'bg-gradient-to-r from-rose-500/20 to-transparent text-white border-l-4 border-rose-500' : 'text-text-muted hover:text-white hover:bg-white/5 hover:-translate-y-1 block'}">
			<Users class="w-5 h-5 {$page.url.pathname.startsWith('/players') ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]' : ''}" />
			Players
		</a>
		<a href="/tournaments" class="group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold {$page.url.pathname.startsWith('/tournaments') ? 'bg-gradient-to-r from-emerald-500/20 to-transparent text-white border-l-4 border-emerald-500' : 'text-text-muted hover:text-white hover:bg-white/5 hover:-translate-y-1 block'}">
			<Trophy class="w-5 h-5 {$page.url.pathname.startsWith('/tournaments') ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}" />
			Tournaments
		</a>
		<a href="/rankings" class="group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold {$page.url.pathname.startsWith('/rankings') ? 'bg-gradient-to-r from-yellow-500/20 to-transparent text-white border-l-4 border-yellow-500' : 'text-text-muted hover:text-white hover:bg-white/5 hover:-translate-y-1 block'}">
			<Medal class="w-5 h-5 {$page.url.pathname.startsWith('/rankings') ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]' : ''}" />
			Rankings
		</a>
	</nav>

	<div class="p-6 mt-auto">
		<a href="/settings" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 text-text-muted hover:text-white hover:bg-white/5 hover:-translate-y-1 {$page.url.pathname.startsWith('/settings') ? 'bg-white/10 text-white shadow-inner' : ''}">
			<Settings class="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
			Settings
		</a>
	</div>
</aside>
