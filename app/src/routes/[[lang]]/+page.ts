import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import groq from 'groq';
import { client } from '$lib/utils/sanity';
import { localizedSlugs } from '$lib/stores/stores';
import { languages } from '$lib/i18n/languages';
import { browser } from '$app/environment';

// export const ssr = false;

const QUERY = groq`*[_type == "work" && defined(slug.current)] | order(orderRank) `;

export const load: PageLoad = async () => {
	try {
		const posts = await client.fetch(QUERY);

		if (!posts) {
			throw error(404, 'Not found');
		}

		const localizedSlugsData: Record<string, string> = {};
		languages.forEach((item: string) => {
			localizedSlugsData[item] = '';
		});

		// Update the localizedSlugs store on the client
		if (browser) {
			localizedSlugs.set(localizedSlugsData);
		}

		return { posts };
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
