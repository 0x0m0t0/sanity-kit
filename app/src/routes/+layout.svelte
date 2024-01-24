<script>
	import '../tailwind.css';
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import LangSwitch from '../lib/components/LangSwitch.svelte';
</script>

<svelte:head>
	<title>TIIIIT</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="header">
		<LangSwitch />
		<Nav />
	</header>
	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
