import { getPosts } from '$lib/utils/sanity';
import { client } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';

export const load = (async () => {
	const posts = await client.fetch(QUERY);

	if (posts) {
		return {
			posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

const QUERY = groq`*[_type == "work" && defined(slug.current)] | order(orderRank) `;
