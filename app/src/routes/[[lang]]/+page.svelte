<script lang="ts">
	import Card from '$components/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	{#if data.posts.length && data.posts[0].mainImage}
		<link rel="preload" as="image" href={data.posts[0].mainImage} />
	{/if}
</svelte:head>

<section>
	<h1 class="sr-only">Home</h1>
	{#if data.posts.length}
		{#each data.posts as post}
			<Card {post} />
		{/each}
	{:else}
		<p>no data</p>
	{/if}
</section>
