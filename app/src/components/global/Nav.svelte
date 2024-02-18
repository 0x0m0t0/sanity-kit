<script lang="ts">
	import { page } from '$app/stores';
	import LangSwitch from '$components/LangSwitch.svelte';

	let lang;
	let LINKS = [];

	$: {
		const lang = $page.params.lang || 'en';
		LINKS = [
			{ name: 'Home', href: `/${lang}` },
			{ name: 'About', href: `/${lang}/about` },
			{ name: 'Blog', href: `/${lang}/blogs` }
		];
	}
</script>

<nav class="w-full flex justify-center" aria-label={'Primary navigation'}>
	{#each LINKS as { name, href }, i}
		<a {href} class="text-sm text-gray hover:text-blue hover:bg-gray mr-2 last:mr-0">{name}</a>
	{/each}

	<LangSwitch />
</nav>
