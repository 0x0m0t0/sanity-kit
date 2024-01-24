<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { onMount } from 'svelte';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { PageData } from './$types';
	import interdit from '$lib/images/interdit.jpg';

	import { workLang } from '$lib/stores/stores';
	function changeLang(lang: string) {
		workLang.set(lang);
	}

	let language: string;
	// Subscribe to the workLang store
	const unsubscribe = workLang.subscribe((value) => {
		language = value;
	});

	// Ensure to unsubscribe when the component is destroyed
	onMount(() => {
		return unsubscribe;
	});
	export let data: PageData;
	$: matchingLanguageObject = data.otherLang.find((item) => item.language === language);
	console.log('matchingLanguageObject', matchingLanguageObject);
	console.log('data', data);
</script>

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
	<a class="card__link" href={`/test/${language}/blogs/${matchingLanguageObject.slug.current}`}>
		redirect
	</a>
</section>
