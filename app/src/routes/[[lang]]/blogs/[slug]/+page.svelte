<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="post">
	<!-- {#if data.mainImage}
		<img class="post__cover" src={urlFor(data.mainImage).url()} alt="Cover for {data.title}" />
	{:else}
		<div class="post__cover--none" />
	{/if} -->
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<div class="post__content">
			{#if data.body !== null || data.body !== undefined}
				<PortableText value={data.body} components={{}} />
			{:else}
				{null}
			{/if}
		</div>
	</div>
</section>
