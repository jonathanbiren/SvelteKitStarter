import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';
import { authenticateUserLocal } from '$lib/utils/loginLocal';
import { authenticateUserLDAP } from '$lib/utils/loginLDAP';

// async function authenticateUserLDAP(email: string, password: string): Promise<boolean> {

// }

const STATUS_REDIRECT = 303;
const STATUS_FORBIDDEN = 403;

async function authenticateUser(email: string, password: string) {
	let { valid, commonName } = await authenticateUserLocal(email, password);

	if (!valid) {
		({ valid, commonName } = await authenticateUserLDAP(email, password));
	}

	return { valid, commonName };
}

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { valid, commonName } = await authenticateUser(email, password);

		if (valid) {
			const payload = { authenticated: true };
			const options = { expiresIn: '1h' };
			const token = jwt.sign(payload, PRIVATE_KEY, options);

			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				maxAge: 3600
			});

			if (commonName.length > 0) {
				return redirect(STATUS_REDIRECT, `${commonName}`);
			} else {
				console.log('Auth was successful but common name is empty:', commonName);
			}
		} else {
			return fail(STATUS_FORBIDDEN, { incorrect: true, email });
		}
	}
};
