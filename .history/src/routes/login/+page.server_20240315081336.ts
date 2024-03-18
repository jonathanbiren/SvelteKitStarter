import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';
import { redirect } from '@sveltejs/kit';

//In the form action, w
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
		}
	}
};
