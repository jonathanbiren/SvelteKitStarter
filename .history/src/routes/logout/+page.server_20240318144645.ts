import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
   async default({ cookies }) {
        cookies.delete('', { path: '/' }); 
        throw redirect(303, '/login'); 
   }
};