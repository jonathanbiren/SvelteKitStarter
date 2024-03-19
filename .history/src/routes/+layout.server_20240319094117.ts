import type { LayoutServerLoad } from './$types';


export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');
	
	function isTokenValid(token) {
		try {
			jwt.verify(token, PRIVATE_KEY);
			return true; // Token is valid
		} catch (error) {
			return false; // Token is invalid
		}
	}

	if(token){

	}

	return {
		isAuthenicated: token ? true : false
	}
}) satisfies LayoutServerLoad;
