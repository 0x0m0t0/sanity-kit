// import SanityImage from '@tylermcrobert/svelte-sanity-image'; // Optional typing
// import { client } from '../utils/sanity';

// export async function load() {
// 	const imageQuery = `*[_type == 'yourDoc'][0].yourImage`;
// 	const image: SanityImage = await client.fetch(imageQuery);

// 	return { image };
// }

import groq from 'groq';

export const IMAGE = groq`
  'url': asset->url,
  'altText': asset->altText,
  'height': asset->metadata.dimensions.height,
  'width': asset->metadata.dimensions.width,
  'aspectRatio': asset->metadata.dimensions.aspectRatio,
  'blurDataURL': asset->metadata.lqip,
  'dominant': asset->metadata.palette.dominant,
`;
