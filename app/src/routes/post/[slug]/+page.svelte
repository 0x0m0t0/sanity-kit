<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import Carousel from '../../../components/Carousel.svelte';
	import ResImage from '../../../components/ResImage.svelte';
	import type { PageData } from './$types';
	import interdit from '$lib/images/interdit.jpg';

	export let data: PageData;
</script>

<section class="post">
	{#if data.mainImage}
		<img
			class="post__cover"
			src={urlFor(data.mainImage).url()}
			alt="Cover image for {data.title}"
		/>

		<div class="w-full">
			<Carousel images={data.images} />
		</div>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="post__excerpt">{data.excerpt}</p>
		<p class="post__date">
			{formatDate(data._createdAt)}
		</p>
		<div class="post__content">
			{#if data.body !== null || data.body !== undefined}
				<PortableText value={data.body} />
			{:else}
				{null}
			{/if}
		</div>
	</div>
</section>
