import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getBlog } from '$lib/utils/sanity';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export const ssr = false;

export const load = (async ({ params }) => {
	// const lang = get(page.params.lang);

	// params.slug
	const post = await getBlog(params.lang);
	console.log(post);
	console.log('tlaaaaang', params.lang);
	if (post) return post;

	throw error(404, 'Not found');
}) satisfies PageLoad;
