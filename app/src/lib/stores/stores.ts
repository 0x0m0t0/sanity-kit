import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// export const workLang = writable('en');

const defaultValue = 'en';
export const initialValue = browser
	? window.localStorage.getItem('lang') ?? defaultValue
	: defaultValue;

const workLang = writable<string>(initialValue);

workLang.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('lang', value);
	}
});

export default workLang;

export const currentSlug = writable<string>('');

// import { writable } from 'svelte/store';

export const localizedSlugs = writable({});

export const isSwitching = writable(false);
