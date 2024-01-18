import { getPosts } from '$lib/utils/sanity';
import { get } from 'svelte/store';
import { client } from '$lib/utils/sanity';
import { page } from '$app/stores';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';

export const load = (async ({ params: { lang } }) => {
	const posts = await client.fetch(
		groq`*[_type == "blog" && language==$lang  && defined(slug.current)] | order(orderRank)`,
		{ lang: lang }
	);

	if (posts) {
		return {
			posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
