import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';
import { client } from '$lib/utils/sanity';
import { localizedSlugs } from '$lib/stores/stores';
import { browser } from '$app/environment';

// export const ssr = false;

export const load: PageLoad = async ({ params: { lang, slug } }) => {
	try {
		const post = await client.fetch(
			groq`*[_type == "blog" && language == $lang && slug.current == $slug][0]
			{
				title,
				slug,
				language,
				body,
				"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
				 {
				  slug,
					language
				},
			}`,
			{ lang, slug }
		);

		// console.log('posts', post);

		if (!post) {
			throw error(404, 'Not found');
		}

		const localizedSlugsData = {};
		post._translations.forEach((item) => {
			localizedSlugsData[item.language] = `/blogs/${item.slug.current}`;
		});

		const finalPost = { ...post, localizedSlugs: localizedSlugsData };

		// Update the localizedSlugs store on the client
		if (browser) {
			localizedSlugs.set(localizedSlugsData);
		}

		return finalPost;
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
