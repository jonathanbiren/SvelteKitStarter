import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


// This load function is completely unnenccessary, but svelteKit seems to 
// to bypass the handle hook for any pages that are not server-side rendered
export const load : PageServerLoad = (async ({cookies}) => {
	const authStatus = cookies.get('authentication');
	if (!authStatus || authStatus !== 'true') {
		console.log("You are about to be redirected from the (");
		throw redirect(302, '/login');
	}
	return; 
}) 
