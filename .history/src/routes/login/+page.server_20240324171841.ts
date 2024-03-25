import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';
import { authenticateUserLocal } from '$lib/utils/loginLocal';
import { authenticateUserLDAP } from '$lib/utils/loginLDAP';

// async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {

// }

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		//Extract the email and the password from the form passed to the form action
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		let authenticated = await authenticateUserLocal(email, password);
		if (!authenticated) {
			authenticated = authenticateUserLDAP(email, password);
		}

		if (authenticated) {
			//This is where you need to implement the JWT token generation
			// as well as setting the cookie that contains the newly generated token
			const payload = {
				authenticated: true
			};

			const options = {
				expiresIn: '1h'
			};

			const token = jwt.sign(payload, PRIVATE_KEY, options);

			cookies.set('jwt', token, {
				path: '/',
				//The httpOnly flag is used to prevent the client from accessing the cookie
				httpOnly: true,
				//Might interfere with local development
				// secure: true,
				// sameSite: 'strict',
				maxAge: 3600
			});

			throw redirect(303, '/search');
		} else {
			return fail(403, {
				incorrect: true
			});
		}
	}
};
