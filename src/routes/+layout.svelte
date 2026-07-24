<script>
	import '../app.css';
	import Sidebar from '../components/layout/Sidebar.svelte';
	import Topbar from '../components/layout/Topbar.svelte';
	import Toast from '../components/ui/Toast.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>ChessOps | Tournament Manager</title>
</svelte:head>

<div class="min-h-screen bg-background text-text-main flex selection:bg-primary/30">
	<Sidebar />
	<div class="flex-1 ml-64 flex flex-col min-w-0">
		<Topbar />
		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
</div>

<Toast />
