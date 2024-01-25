import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';
import { client } from '$lib/utils/sanity';
import { getBlog } from '$lib/utils/sanity';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export const ssr = false;

// export const load = (async ({ params: { lang, slug } }) => {
// 	// const lang = get(page.params.lang);

// 	// params.slug
// 	const post = await client.fetch(
// 		groq`*[_type == "blog" && language==$lang && slug.current == $slug][0]`,
// 		{ lang: lang, slug: slug }

// 		const query = post.body[0]._key;
// 		// groq`*[_type == "blog" && body[0]._key=="9118afad3be1"][0]`,

// 	);

// 	console.log(post);
// 	console.log('tlaaaaang', lang);
// 	if (post) return post;

// 	throw error(404, 'Not found');
// }) satisfies PageLoad;

export const load: PageLoad = async ({ params: { lang, slug } }) => {
	try {
		// Fetch the initial data
		const post = await client.fetch(
			groq`*[_type == "blog" && language == $lang && slug.current == $slug][0]`,
			{ lang, slug }
		);

		// If the post is not found, throw a 404 error
		if (!post) {
			throw error(404, 'Not found');
		}

		// Extract the key from the first post
		const postKey = post.body[0]._key;

		// Fetch additional data based on the key
		const otherLang = await client.fetch(
			groq`*[_type == "blog" && body[0]._key == $postKey]{
			slug,
			language
		  }`,
			{
				postKey
			}
		);

		console.log('Additional Data:', otherLang);

		// Merge the additional data into the original post
		const finalPost = { ...post, otherLang };
		console.log('finalPost', finalPost);
		return finalPost;
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
