import type { Actions } from './$types';

export const actions: Actions = {
   async default({ cookies }) {
        cookies.delete('authentication', { path: '/' }); 
        
   }
};