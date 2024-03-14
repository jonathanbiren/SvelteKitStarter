import type { PageServerLoad } from './$types';
import type { User } from '$lib/types/User';
import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users: User[] = await response.json();
	return {
		users
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log('This was executed on the server');
		const user: UserSmall | undefined = authenticateUser(, password);
		if (user) {
			cookies.set('authentication', 'true', {
				path: '/',
				maxAge: 3600
			});

			return {
				msg: 'success'
			};
		} 	}
};
