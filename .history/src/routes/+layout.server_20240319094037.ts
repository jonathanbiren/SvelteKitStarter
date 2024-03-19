import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
   async default({ cookies }) {
        cookies.delete('jwt', { path: '/' }); 
        throw redirect(303, '/login'); 
   }
};
export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');
	if(token){

	}

	return {
		isAuthenicated: token ? true : false
	}
}) satisfies LayoutServerLoad;
