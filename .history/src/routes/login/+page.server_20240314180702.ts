import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';


export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log('This was executed on the server');
		const user: UserSmall | undefined = authenticateUser(email, password);
		if (user) {
			console.log("Cook");
			cookies.set('authentication', 'true', {
				path: '/',
				maxAge: 1
			});

			return {
				msg: 'success'
			};
		}
	}
};
