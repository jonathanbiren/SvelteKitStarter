import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';
import { redirect, type ServerLoad } from '@sveltejs/kit';


// export const load: ServerLoad = async (event) => {
   
//    return {
	 
//    };
// };


//In the form action, we import our mock authentication, and check whether the user
//exists. If the user exists, we set the cookie and redirect to the search page.
export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user: UserSmall | undefined = authenticateUser(email, password);
		if (user) {
			cookies.set('authentication', 'true', {
				path: '/',
				maxAge: 60
			});

			throw redirect(302, '/search');
		} else {
		
		}
	}
};
