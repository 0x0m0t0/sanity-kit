<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// console.log('data', data);
</script>

<section>
	{#if data.posts}
		<h1 class="post__title">{data.posts.title}</h1>
		<div class="post__content">
			{#if data.posts.body !== null || data.posts.body !== undefined}
				<PortableText value={data.posts.body} components={{}} />
			{:else}
				{null}
			{/if}
		</div>
	{:else}
		<p>"No about post yet."</p>
	{/if}
</section>
