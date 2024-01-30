import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'en';
const initialValue = browser ? window.localStorage.getItem('lang') ?? defaultValue : defaultValue;

const storageLang = writable<string>(initialValue);

storageLang.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('lang', value);
	}
});

export default storageLang;
