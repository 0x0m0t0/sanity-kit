// import type { Handle } from '@sveltejs/kit';
// import cookie from 'cookie';

// function get_lang(event) {
// 	const cookies = cookie.parse(event.request.headers.cookie || '');
// 	return cookies.lang || 'en';
// }

// export const handle: Handle = ({ event, resolve }) => {
// 	return resolve(event, {
// 		transformPageChunk: ({ html }) => html.replace('%lang%', get_lang(event))
// 	});
// };

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.params.lang || 'en')
	});
};
