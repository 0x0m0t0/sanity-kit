<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { PageData } from './$types';
	import { derived } from 'svelte/store';
	import { get } from 'svelte/store';
	import workLang from '$lib/stores/stores';
	import { currentSlug } from '$lib/stores/stores';
	export let data: PageData;

	// $: {
	// 	const matchingLanguageObject = data.otherLang.find((item) => item.language === $workLang);

	// 	if (matchingLanguageObject !== undefined) {
	// 		currentSlug.set(`/blogs/${matchingLanguageObject.slug.current}`);
	// 	} else if (matchingLanguageObject === undefined) {
	// 		currentSlug.set(``);
	// 	}
	// }
	const derivedCurrentSlug = derived([workLang, currentSlug], ([workLang, currentSlug]) => {
		const matchingLanguageObject = data.otherLang.find((item) => item.language === workLang);
		if (matchingLanguageObject) {
			return `/blogs/${matchingLanguageObject.slug.current}`;
		} else {
			return '';
		}
	});

	$: {
		currentSlug.set($derivedCurrentSlug as string);
	}

	console.log(data.otherLang);
</script>

<p>slug: {$currentSlug}</p>
<p>lang: {$workLang}</p>

<section class="post">
	{#if data.mainImage}
		<img
			class="post__cover"
			src={urlFor(data.mainImage).url()}
			alt="Cover image for {data.title}"
		/>
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
</section>
