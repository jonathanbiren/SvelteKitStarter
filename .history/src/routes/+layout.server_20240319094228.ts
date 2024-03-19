import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private'; 

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');
	
	function isTokenValid(token: string): boolean {
		try {
			jwt.verify(token, PRIVATE_KEY);
			return true; // Token is valid
		} catch (error) {
			return false; // Token is invalid
		}
	}


	return {
		isAuthenicated: token ? true : false
	}
}) satisfies LayoutServerLoad;
