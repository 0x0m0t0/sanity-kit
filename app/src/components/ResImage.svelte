<script lang="ts">
import SanityImage from '@tylermcrobert/svelte-sanity-image'; // Optional typing
import { client } from '$lib/utils/sanity';

export let image: any;
export let sizes: string;
export let alt: string;
</script>



<!-- // (max-width: 600px) 480px, 800px -->
<SanityImage
  {client}
  image={image}
  sizes={sizes}
  alt={alt}
/>