import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


//TODO: You have currently implemented the authentication using cookie-based
// authentication. You will have to implement this using LDAP in the future. 
export const load : PageServerLoad = (async ({cookies}) => {
	const authStatus = cookies.get('authentication');
	if (!authStatus || authStatus !== 'true') {
		throw redirect(302, '/login');
	}
	return; 
}) 
