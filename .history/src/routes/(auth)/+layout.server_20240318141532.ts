import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const authStatus: boolean = cookies.get('')
	// if (!cookies.get('authentication') || cookies.get('authentication') !== 'true') {
	// 	throw redirect(303, `/login`);
	// }
}
