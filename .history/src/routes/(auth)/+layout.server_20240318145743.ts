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
		//If the token is successfully decoded, then the variable decoded will contain the payload
		// of the token
		const decoded = jwt.verify(token, PRIVATE_KEY) as PayloadType;
		const { authenticated } = decoded;
		console.log(authenticated);
		if(authenticated) {
			throw redirect(302, `/search`);
		}
	} catch (error) {
		console.log("An error has occured");
		console.log(error);
		throw redirect(303, `/login`);
	}
}
