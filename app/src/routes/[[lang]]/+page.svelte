<script context="module" lang="ts">
	import type { PageData } from './$types';

	export async function load({ fetch }) {
		const res = await fetch('your-api-url');
		const data: PageData = await res.json();

		if (data.posts.length > 0) {
			const link = document.createElement('link');
			link.rel = 'preload';
			link.as = 'image';
			link.href = data.posts[0].mainImage;
			document.head.appendChild(link);
		}

		return { props: { data } };
	}
</script>

<script lang="ts">
	import Card from '$components/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

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
