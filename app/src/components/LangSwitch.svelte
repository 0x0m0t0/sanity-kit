<script lang="ts">
	import workLang from '$lib/stores/stores';
	import { currentSlug } from '$lib/stores/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';
	let options = [];
	export let disabled = false;
	const id = `select-${Math.floor(Math.random() * 1000000)}`;

	export let value: string = $workLang.toUpperCase();

	function changeLang(lang: string) {
		workLang.set(lang.toLowerCase());
	}

	const filteredOptions = derived(workLang, ($workLang = 'en') => {
		const uniqueOptions = Array.from(
			new Set(
				[
					{ value: $workLang.toUpperCase() },
					{ value: 'EN' },
					{ value: 'FR' },
					{ value: 'ES' },
					{ value: 'PT' }
				].map((option) => option.value)
			)
		);
		return uniqueOptions.map((value) => ({ value }));
	});

	$: options = [...$filteredOptions];

	function updateOptions(e) {
		const lang = e.toLowerCase();
		if (lang === $workLang) {
			goto(`/${lang}${$currentSlug}`);
		} else {
			goto(`/${lang}`);
		}
	}

	console.log('currentSlug', $currentSlug);
	console.log('workLang', $workLang);
</script>

<div class="flex flex-col">
	<p>current language {$currentSlug}</p>
	<p>current language {$workLang}</p>

	<select
		{id}
		bind:value
		{disabled}
		on:change={(e) => {
			changeLang(e.target.value);
			updateOptions(e.target.value);
		}}
	>
		{#each options as option}
			<option>{option.value}</option>
		{/each}
	</select>
</div>

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
