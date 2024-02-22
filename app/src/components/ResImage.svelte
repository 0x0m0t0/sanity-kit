<script lang="ts">
	import SanityImage from '@tylermcrobert/svelte-sanity-image'; // Optional typing
	import { urlFor } from '$lib/utils/image';
	// import { transformUrl } from 'unpic';
	import { client } from '$lib/utils/sanity';
	import { Image } from '@unpic/svelte';

	export let src: any;

	// export let image: any;
	// export let width: number;
	export let sizes: string;
	export let alt: string;

	// const url = transformUrl({
	// 	url: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
	// 	width: 800,
	// 	height: 600,
	// 	cdn: 'shopify'
	// });
</script>

<!-- // (max-width: 600px) 480px, 800px -->
<!-- <SanityImage {client} {image} {sizes} {alt} /> -->

<Image src={urlFor(src).auto('format').url()} layout="fullWidth" {alt} {sizes} />
