<script>
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import '$src/tailwind.css';
	import Nav from '$components/global/Nav.svelte';
	import Footer from '$components/Footer.svelte';

	export let data;
</script>

<svelte:head>
	<title>Portfolio i18n</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="header">
		<Nav />
	</header>

	{#key data.pathname}
		<!-- <main class="flex-grow" in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}> -->
		<main
			class="flex-grow"
			in:fly={{ y: 50, duration: 250, delay: 300 }}
			out:fly={{ y: 50, duration: 250 }}
		>
			<slot />
		</main>
	{/key}

	<Footer />
</div>
