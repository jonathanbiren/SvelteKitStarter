import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

export function load({ cookies }) {
	const token = cookies.get('jwt'); 
	if(!token) {
		throw redirect(303, `/login`);
	}

	try {
		const decoded = jwt.verify(token)
	}
	// if (!cookies.get('authentication') || cookies.get('authentication') !== 'true') {
	// 	throw redirect(303, `/login`);
	// }
}
