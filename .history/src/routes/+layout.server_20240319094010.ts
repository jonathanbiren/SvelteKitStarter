import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	function isToken(params:type) {
		
	}

	return {
		isAuthenicated: token ? true : false
	}
}) satisfies LayoutServerLoad;
