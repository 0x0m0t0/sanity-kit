<script lang="ts">
	import SanityImage from '@tylermcrobert/svelte-sanity-image'; // Optional typing
	import { urlFor } from '$lib/utils/image';
	// import { transformUrl } from 'unpic';
	import { client } from '$lib/utils/sanity';
	import { Image } from '@unpic/svelte';
	import { onMount } from 'svelte';

	export let src: any;
	let imgwidth: number;
	// export let image: any;
	// export let width: number;
	//
	export let sizes: string;
	export let alt: string;

	// const url = transformUrl({
	// 	url: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
	// 	width: 800,
	// 	height: 600,
	// 	cdn: 'shopify'
	// });
	//
	onMount(() => {
		if (typeof window !== 'undefined') {
			let sizePercentage = parseInt(sizes.replace('vw', ''), 10) / 100;
			imgwidth = Math.round(window.innerWidth * sizePercentage);
			console.log('wiee', imgwidth);
		}
	});
	// $: imgSrc = urlFor(src).width(imgwidth).url();
</script>

<!-- // (max-width: 600px) 480px, 800px -->
<!-- <SanityImage {client} {image} {sizes} {alt} /> -->

<Image src={urlFor(src).width(imgwidth).url()} layout="constrained" {alt} {sizes} />
<!-- <img src={urlFor(src).width(imgwidth).format('webp').url()} {alt} {sizes} /> -->
