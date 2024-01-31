import { getPosts } from '$lib/utils/sanity';
// import { initialValue } from '$lib/stores/stores'; // fetch data from sanity lang
import { client } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { currentSlug } from '$lib/stores/stores';
import groq from 'groq';
import workLang from '$lib/stores/stores';

export const ssr = false;

export const load = (async ({ params }) => {
	const posts = await client.fetch(QUERY);

	workLang.subscribe((value) => {
		currentSlug.set('/');
	});

	if (posts) {
		return {
			posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

const QUERY = groq`*[_type == "work" && defined(slug.current)] | order(orderRank) `;
