import type { PortableTextBlock } from '@portabletext/types';
import { createClient } from '@sanity/client';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2023-03-20' // date of setup
});

export async function getPosts(): Promise<Post[]> {
	return await client.fetch(
		groq`*[_type == "work" && defined(slug.current)] | order(_createdAt desc)`
	);
}
export async function getBlogs(): Promise<Post[]> {
	return await client.fetch(
		groq`*[_type == "blog" && defined(slug.current)] | order(_createdAt desc)`
	);
}

export async function getPost(slug: string): Promise<Post> {
	return await client.fetch(groq`*[_type == "work" && slug.current == $slug][0]`, {
		slug
	});
}
export async function getBlog(lang: string): Promise<Post> {
	return await client.fetch(
		groq`*[_type == "blog" && language==$lang && body[0]._key=="9118afad3be1"][0]`,
		{
			// slug,
			lang
		}
		// groq`*[_type == "blog" && language==$lang && slug.current == $slug][0]`,
		// {
		// 	slug,
		// 	lang
		// }
	);
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
	images: ImageAsset[];
}
