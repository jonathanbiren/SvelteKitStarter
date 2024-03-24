import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';

//Utility function to check if token is valid
//
function isTokenValid(token: string): boolean {
	try {
		jwt.verify(token, PRIVATE_KEY);
		return true; // Token is valid
	} catch (error) {
		return false; // Token is invalid
	}
}

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt');
	let authStatus: boolean = false;

	if (token) {
		authStatus = isTokenValid(token);
	}

	return {
		isAuthenicated: authStatus
	};
};
