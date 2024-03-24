import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';

//Utility function to check if token is valid
//TODO: Extract this to a utility file when you refactor the code base
function isTokenValid(token: string): boolean {
	try {
		jwt.verify(token, PRIVATE_KEY);
		return true; // Token is valid
	} catch (error) {
		return false; // Token is invalid
	}
}


//Once the user successfully logs in and is re-routed to a protected route
//the layout load function will re-
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
