<script lang="ts">
	import Card from '$components/Card.svelte';
	import type { PageData } from './$types';
	import storageLang from '$lib/stores/lang';
	import { currentSlug } from '$lib/stores/stores';
	import workLang from '$lib/stores/stores';

	$currentSlug = '';

	export let data: PageData;
</script>

<section>
	<h1>Title page hello</h1>
	<p>{$storageLang}</p>
	{#if data.posts.length}
		{#each data.posts as post}
			<Card {post} />
		{/each}
	{:else}
		<p>no data</p>
		<p />
	{/if}
</section>
