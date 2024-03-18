import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';

export function load({ cookies }) {
	const token = cookies.get('jwt'); 
	if(!token) {
		throw redirect(303, `/login`);
	}

	try{

	}
	// if (!cookies.get('authentication') || cookies.get('authentication') !== 'true') {
	// 	throw redirect(303, `/login`);
	// }
}
