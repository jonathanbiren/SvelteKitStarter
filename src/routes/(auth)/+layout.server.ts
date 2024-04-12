import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/utils/jwtAuth.js';

// The load fuction only checks whether the token is present and valid
// This part of the code is not responsible for generating the token
export function load({ cookies }) {
	const token = cookies.get('jwt');

	//If no token is present, redirect to login page
	if (!token) {
		throw redirect(303, '/login');
	}
	const { valid } = verifyToken(token);
	if (!valid) {
		throw redirect(303, '/login');
	}
}
