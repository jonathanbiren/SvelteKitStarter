import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

interface PayloadType {
	authenticated: boolean;
}

export function load({ cookies }) {
	const token = cookies.get('jwt');

	if (!token || jwt.verify(token, PRIVATE_KEY) !== true) {
		throw redirect(303, `/login`);
	}
	try {
		const decoded = jwt.verify(token, PRIVATE_KEY) as PayloadType;
		if (!decoded.authenticated) {
			// If not authenticated, redirect to login
			throw redirect(303, `/login`);
		} else {
			console.log('Authorisation granted since web token was present and valid');
			throw redirect(303, `/search`);
		}
		//Since we already got redirected to the search page by the login, it
		// suffices to check the authentication
	} catch (error) {
		// If token verification fails, redirect to login
		console.log('An error has occurred during token verification');
		console.log(error);
		throw redirect(303, `/login`);
	}
}
