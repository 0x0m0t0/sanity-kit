<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	import { formatDate } from '$lib/utils';
	import Carousel from '$components/Carousel.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="post">
	<div class="w-full">
		<Carousel images={data.images} />
	</div>

	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="post__excerpt">{data.excerpt}</p>
		<p class="post__date">
			{formatDate(data._createdAt)}
		</p>
		<div class="post__content">
			{#if data.body !== null || data.body !== undefined}
				<PortableText value={data.body} components={{}} />
			{:else}
				{null}
			{/if}
		</div>
	</div>
</section>
