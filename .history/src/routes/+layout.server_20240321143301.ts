import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';

//private key defined in .env file. If changed, application needs to be redeployed.
const 

//This layout file checks the authentication status, which is then to be used throughout 
// the application to determine if the user is authenticated or not.
export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	function isTokenValid(token: string): boolean {
		try {
			jwt.verify(token, privateKey);
			return true; // Token is valid
		} catch (error) {
			return false; // Token is invalid
		}
	}

	let authStatus: boolean = false;
	if (token) {
		authStatus = isTokenValid(token);
	}

	return {
		isAuthenicated: authStatus
	};
}) satisfies LayoutServerLoad;
