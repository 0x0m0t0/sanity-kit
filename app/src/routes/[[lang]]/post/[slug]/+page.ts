import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { localizedSlugs } from '$lib/stores/stores';
import { languages } from '$lib/i18n/languages';
import { browser } from '$app/environment';
import { getPost } from '$lib/utils/sanity';

// export const ssr = false;

export const load: PageLoad = async ({ params: { lang, slug } }) => {
	try {
		const post = await getPost(slug);
		if (!post) {
			throw error(404, 'Not found');
		}
		console.log('slug', slug);
		const localizedSlugsData = {};
		languages.forEach((item) => {
			localizedSlugsData[item] = `/post/${slug}`;
		});

		const finalPost = { ...post, localizedSlugs: localizedSlugsData };

		// Update the localizedSlugs store on the client
		if (browser) {
			localizedSlugs.set(localizedSlugsData);
		}

		if (finalPost) return finalPost;
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
