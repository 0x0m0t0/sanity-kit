<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { localizedSlugs } from '$lib/stores/stores';
	import { languages } from '$lib/i18n/languages';

	let className: string;
	export { className as class };
	export let justify: string = 'justify-center';
	export let disabled = false;
	const id = `select-${Math.floor(Math.random() * 1000000)}`;

	let currentLang = $page.params.lang || 'en';

	let switching = false;
	export let button: string = 'text-sm last:mr-0';
	export let onLanguageClick: () => void = () => {};

	// Function to switch the language
	async function switchLanguage(lang: string) {
		if (switching) return;
		switching = true;

		// Get the localized slug for the new language
		const slug = ($localizedSlugs as { [key: string]: string })[lang];

		if (slug) {
			await goto('/' + lang + slug), { invalidateAll: true };
		} else {
			await goto('/' + lang);
		}

		switching = false;
		onLanguageClick();
	}
</script>

<div class="flex {justify} {className}">
	{#each languages as lang}
		<button
			id={`${id}-${lang}`}
			{disabled}
			on:click={() => switchLanguage(lang)}
			class=" text-dark-gray hover:text-stone-400 md:mr-5 last:mr-0 {button}"
		>
			{lang.toUpperCase()}
		</button>
	{/each}
</div>
