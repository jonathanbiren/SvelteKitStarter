import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ params }) => {
	const postTitle: string = params.banana;
	return {
		postTitle
	};
}) satisfies PageServerLoad;
