<script lang="ts">
	import { workLang } from '$lib/stores/stores';
	import Select from '$components/Select.svelte';

	let value: string;

	let language: string;

	workLang.subscribe((lang) => {
		language = lang;
	});

	const options = [
		{ value: language },
		{ value: 'en' },
		{ value: 'fr' },
		{ value: 'es' },
		{ value: 'pt' }
	];
</script>

<section>
	<!-- <Select {options} bind:value /> -->

	about page
</section>
