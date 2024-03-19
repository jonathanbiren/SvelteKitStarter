import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	return {
		isAuthenicated: toe
	}
}) satisfies LayoutServerLoad;
