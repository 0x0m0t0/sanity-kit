<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import LangSwitch from '../components/LangSwitch.svelte';
</script>

<svelte:head>
	<title>TIIIIT</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="header">
		<Nav />
	</header>
	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
