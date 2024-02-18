<script>
	import '$src/tailwind.css';
	import Nav from '$components/global/Nav.svelte';
	import Footer from '$components/Footer.svelte';
</script>

<svelte:head>
	<title>Portfolio i18n</title>
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
