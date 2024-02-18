import { getPosts } from '$lib/utils/sanity';
// import { initialValue } from '$lib/stores/stores'; // fetch data from sanity lang
import { client } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';
import workLang from '$lib/stores/stores';
import { currentSlug } from '$lib/stores/stores';

export const ssr = false;

export const load = (async ({ params: { lang } }) => {
	let posts;

	let lango = 'en';
	workLang.subscribe((value) => {
		lango = value;
		currentSlug.set(`/about`);
	});

	if (lango !== lang) {
		posts = await client.fetch(groq`*[_type == "about" && language==$lang] | order(orderRank)`, {
			lang: lang
		});
	} else if (lango === lang) {
		posts = await client.fetch(groq`*[_type == "about" && language==$lango] | order(orderRank)`, {
			lango: lango
		});
	} else {
		posts = await client.fetch(
			groq`*[_type == "about" && language=="en"  && defined(slug.current)]  | order(orderRank)`
		);
	}

	if (posts) {
		return {
			posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
