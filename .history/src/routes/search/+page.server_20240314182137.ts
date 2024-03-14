import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


// This load function is completely unnenccessary, but svelteKit seems to 
// to bypass the handle hook for any pages 
export const load : PageServerLoad = (async ({cookies}) => {
	const authStatus = cookies.get('authentication');
	if (!authStatus || authStatus !== 'true') {
		throw redirect(302, '/login');
	}
	return; 
}) 
