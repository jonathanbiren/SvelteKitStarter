import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

interface PayloadType {
	authenticated: boolean;
}

export function load({ cookies }) {
	const token = cookies.get('jwt');
	if (!token) {
		throw redirect(303, `/login`);
	}
	try {
		const decoded = jwt.verify(token, PRIVATE_KEY) as PayloadType;
		// Assuming `authenticated` is a boolean within your token payload
		if (!decoded.authenticated) {
			// If not authenticated, redirect to login
			throw redirect(303, `/login`);
		}
		//Since we already got redirected to the search page by the login, 
	} catch (error) {
		// If token verification fails, redirect to login
		console.log('An error has occurred during token verification');
		console.log(error);
		throw redirect(303, `/login`);
	}

	// Continue with loading the current page for authenticated users
	// Return props or data as needed
	return {};
}
