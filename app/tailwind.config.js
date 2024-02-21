/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#2F3336',
				gray: '#C4C4C4'
			},
			height: {
				screen: '["100vh","100dvh"]'
			}
		}
	},
	plugins: []
};
