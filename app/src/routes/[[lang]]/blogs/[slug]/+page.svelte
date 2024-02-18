<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	console.log('pagedata', data);
	let currentSlug;

	$: {
		currentSlug = data && data.localizedSlugs ? data.localizedSlugs[$page.params.lang] : undefined;
	}
</script>

<p>slug: {currentSlug}</p>
<p>lang: {$page.params.lang}</p>

<!-- <section class="post">
	{#if data.mainImage}
		<img class="post__cover" src={urlFor(data.mainImage).url()} alt="Cover for {data.title}" />
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="post__excerpt">{data.excerpt}</p>
		<p class="post__date">
			{formatDate(data._createdAt)}
		</p>
	</div>
</section> -->
