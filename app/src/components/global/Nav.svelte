<script lang="ts">
	import { page } from '$app/stores';
	import LangSwitch from '$components/LangSwitch.svelte';

	let lang;
	let LINKS = [];

	const about = {
		en: 'about',
		es: 'sobre',
		fr: 'a-propos',
		pt: 'sobre-nos'
	};

	$: {
		const lang = $page.params.lang || 'en';
		LINKS = [
			{ name: 'Home', href: `/${lang}` },
			{ name: 'About', href: `/${lang}/page/${about[lang]}` },
			{ name: 'Blog', href: `/${lang}/blogs` }
		];
	}
</script>

<nav class="w-full flex justify-center" aria-label={'Primary navigation'}>
	{#each LINKS as { name, href }, i}
		<a {href} class="text-sm text-dark-gray hover:text-blue-800 mr-2 last:mr-0">{name}</a>
	{/each}

	<LangSwitch />
</nav>
