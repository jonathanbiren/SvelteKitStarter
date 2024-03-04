import type { PageLoad } from './$types';
import { getPostBySlug } from '$lib/posts';

export const load: PageLoad = (async ({params}) => {
	const post = await getPostBySlug(params.slug);
	if (!post) {
		return {
			status: 404,
			error: new Error(`Post not found: ${params.slug}`)
		};
	}
	return {
		post
	};
})
