import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

interface PayloadType {
	authenticated: boolean;
}

export function load({ cookies }) {
	const token = cookies.get('jwt');
	
	if(token) {
		const decoded = jwt.verify(token, PRIVATE_KEY) as PayloadType;
		if (decoded.authenticated) {
			console.log('Authorisation granted since web token was present and valid');
			throw redirect(303, `/search`);
		}

		else {
			throw redirect(303, `/login`); 
		}
	} 

	else {
		thorw
	}
}
