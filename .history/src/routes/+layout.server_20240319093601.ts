import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	if (!token) {
		return {
			isAuthenticated: false
		};
	} else {
		return {
			isAuthenticated: true
		};
	}
}) satisfies LayoutServerLoad;
