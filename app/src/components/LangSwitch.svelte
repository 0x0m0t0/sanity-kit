<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { localizedSlugs } from '$lib/stores/stores';
	import { languages } from '$lib/i18n/languages';

	export let disabled = false;
	const id = `select-${Math.floor(Math.random() * 1000000)}`;

	let currentLang = $page.params.lang || 'en';

	let switching = false;

	// Function to switch the language
	async function switchLanguage(lang) {
		if (switching) return;
		switching = true;

		// Get the localized slug for the new language
		const slug = $localizedSlugs[lang];

		// Navigate to the new URL
		if (slug) {
			await goto('/' + lang + slug);
		} else {
			await goto('/' + lang);
		}

		switching = false;
	}
</script>

<!-- <div class="flex flex-col"> -->
<!-- <select
		{id}
		bind:value={currentLang}
		{disabled}
		on:change={(e) => {
			switchLanguage(e.target.value);
		}}
	>
		{#each languages as lang}
			<option value={lang}>{lang}</option>
		{/each}
	</select> -->
<div class="flex justify-center">
	{#each languages as lang}
		<button
			id={`${id}-${lang}`}
			{disabled}
			on:click={() => switchLanguage(lang)}
			class="text-sm mr-5 last:mr-0"
		>
			{lang}
		</button>
	{/each}
</div>

<!-- </div> -->

<style>
	select {
		font-family: inherit;
		font-size: 1em;
		cursor: pointer;
		background: var(--color-white);
		color: var(--color-gray-900);
		border: 2px solid var(--color-gray-900);
		border-radius: 4px;
		appearance: none;
		margin-left: 1em;
	}

	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: '';
		position: absolute;
		bottom: 1.25em;
		right: 0.75em;
		width: 1em;
		height: 1em;
		z-index: 1;
		background: var(--color-gray-900);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		border-radius: 4px;
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		background: var(--color-gray-100);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}
</style>
