<script lang="ts">
	import { page } from '$app/stores';
	import { urlFor } from '$lib/utils/image';
	import type { PageData } from './$types';
	export let data: PageData;

	let lang: string;
	$: lang = $page.params.lang || 'en';
</script>

<section>
	{#if data.posts.length}
		{#each data.posts as post}
			<div class="card">
				{#if post.mainImage}
					<img
						class="card__cover"
						src={urlFor(post.mainImage).width(500).height(300).url()}
						alt="Cover image for {post.title}"
					/>
				{:else}
					<div class="card__cover--none" />
				{/if}

				<div class="card__container">
					<h3 class="card__title">
						<a class="card__link" href={`/${lang}/blogs/${post.slug.current}`}>
							{post.title}
						</a>
					</h3>
					<p class="card__excerpt">{post.excerpt}</p>
				</div>
			</div>
		{/each}
	{:else}
		<p>"No blog posts yet."</p>
	{/if}
</section>
