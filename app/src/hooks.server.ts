// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = ({ event, resolve }) => {
// 	return resolve(event, {
// 		transformPageChunk: ({ html }) => html.replace('%lang%', event.params.lang || 'en')
// 	});
// };

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.request.params.lang || 'en')
	});

	response.headers['link'] = '</fonts/Inter-Regular.woff2>; rel=preload; as=font; crossorigin';

	return response;
};
