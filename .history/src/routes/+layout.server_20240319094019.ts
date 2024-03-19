import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	function isTokenValid(token) {
			
	}

	return {
		isAuthenicated: token ? true : false
	}
}) satisfies LayoutServerLoad;
