import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';
import { client } from '$lib/utils/sanity';
import { currentSlug } from '$lib/stores/stores';
import workLang from '$lib/stores/stores';

export const ssr = false;

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

		let matchingLanguageObject;

		workLang.subscribe((value) => {
			matchingLanguageObject = otherLang.find((item) => item.language === value);

			if (matchingLanguageObject !== undefined) {
				currentSlug.set(`/blogs/${matchingLanguageObject.slug.current}`);
			} else if (matchingLanguageObject === undefined) {
				currentSlug.set(``);
			}
		});

		// Merge the additional data into the original post
		const finalPost = { ...post, otherLang };
		console.log('finalPost', finalPost);
		return finalPost;
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
