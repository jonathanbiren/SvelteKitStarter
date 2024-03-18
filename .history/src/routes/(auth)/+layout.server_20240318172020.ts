import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

interface PayloadType {
	authenticated: boolean;
}

export function load({ cookies }) {
	const token = cookies.get('jwt');

	if (!token) {
		throw redirect(303, '/login');
	}
	//From this point on we know that the token is present
	try {
	}
	const decoded = jwt.verify(token, PRIVATE_KEY) as PayloadType;
	if (decoded.authenticated) {
		console.log('Authorisation granted since web token was present and valid');
	} else {
		throw redirect(303, '/login');
	}
}
