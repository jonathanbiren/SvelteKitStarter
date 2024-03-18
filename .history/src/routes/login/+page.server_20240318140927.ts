import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

//put this key in a .env file later
const key: string = '56F9F928B41C4297E7F69E319A2CE';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user: UserSmall | undefined = authenticateUser(email, password);
		if (user) {
			//This is where you need to implement the JWT token generation
			// as well as setting the cookie that contains the newly generated token
			const payload = {
				authenticated: true
			}	

			const options = {
				expiresIn: '1h'
			}

			const token = jwt.sign(payload, key, options);
			cookies.set('authentication', token, {
				path: '/',
				maxAge: 3600 
			});

			// cookies.set('authentication', 'true', {
			// 	path: '/',
			// 	maxAge: 3600 
			// });
			throw redirect(303, '/search');
		} else {
			return fail(403, {
				incorrect: true
			});
		}
	}
};
