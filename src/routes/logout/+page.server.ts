import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
   async default({ cookies }) {
        cookies.delete('jwt', { path: '/' });
        cookies.delete('commonName', { path: '/' });
        throw redirect(303, '/login'); 
   }
};