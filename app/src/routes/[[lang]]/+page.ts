import { getPosts } from '$lib/utils/sanity';
// import { initialValue } from '$lib/stores/stores'; // fetch data from sanity lang
import { client } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';

export const load = (async ({ params }) => {
	// console.log('initialValue', initialValue);
	const posts = await client.fetch(QUERY);

	if (posts) {
		return {
			posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

const QUERY = groq`*[_type == "work" && defined(slug.current)] | order(orderRank) `;
