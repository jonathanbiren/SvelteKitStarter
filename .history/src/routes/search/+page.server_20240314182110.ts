import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


// This 
export const load : PageServerLoad = (async ({cookies}) => {
	const authStatus = cookies.get('authentication');
	if (!authStatus || authStatus !== 'true') {
		throw redirect(302, '/login');
	}
	return; 
}) 
