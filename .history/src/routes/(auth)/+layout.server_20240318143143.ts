import { redirect } from '@sveltejs/kit';
import { PRIVATE_KEY } from '$env/static/private';

export function load({ cookies }) {
	const authStatus: boolean = cookies.get('jwt'); 
	// if (!cookies.get('authentication') || cookies.get('authentication') !== 'true') {
	// 	throw redirect(303, `/login`);
	// }
}
