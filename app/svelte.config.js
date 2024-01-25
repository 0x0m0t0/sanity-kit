// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare';
// import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// csp: {
		// 	directives: {
		// 		'script-src': ['self']
		// 	}
		// 	// reportOnly: {
		// 	// 	'script-src': ['self']
		// 	// }
		// },

		alias: {
			$components: path.resolve('src/components'),
			$actions: path.resolve('/src/actions'),
			$data: path.resolve('/src/data'),
			$routes: path.resolve('/src/routes'),
			$stores: path.resolve('/src/stores'),
			$styles: path.resolve('/src/styles'),
			$svg: path.resolve('/src/svg'),
			$utils: path.resolve('/src/utils')
		}
	}
};

export default config;
