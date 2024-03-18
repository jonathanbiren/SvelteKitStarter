import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
   async default({ cookies }) {
        cookies.delete('authentication', { path: '/' }); 
        throw redirect(303, )
   }
};