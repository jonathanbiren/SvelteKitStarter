import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


//TODO: You have currently implemented the authentication using cookie-based
// authentication 
export const load : PageServerLoad = (async ({cookies}) => {
	const authStatus = cookies.get('authentication');
	if (!authStatus || authStatus !== 'true') {
		console.log("You are about to be redirected from the /search load function");
		throw redirect(302, '/login');
	}
	return; 
}) 
