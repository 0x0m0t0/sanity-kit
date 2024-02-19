import { error } from '@sveltejs/kit';
import { languages } from '$lib/i18n/languages';
import type { PageLoad } from './$types';
import groq from 'groq';
import { client } from '$lib/utils/sanity';
import { localizedSlugs } from '$lib/stores/stores';
import { browser } from '$app/environment';

export const ssr = false;

export const load: PageLoad = async ({ params: { lang } }) => {
	try {
		const posts = await client.fetch(
			groq`*[_type == "blog" && language==$lang] | order(orderRank)`,
			{
				lang: lang
			}
		);

		if (!posts) {
			throw error(404, 'Not found');
		}

		const localizedSlugsData = {};
		languages.forEach((item) => {
			localizedSlugsData[item] = `/blogs`;
		});

		if (browser) {
			localizedSlugs.set(localizedSlugsData);
		}

		return {
			posts
		};
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
