import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { PRIVATE_KEY } from '$env/static/private';
import { authenticateUserLocal } from '$lib/utils/loginLocal';
import { authenticateUserLDAP } from '$lib/utils/loginLDAP';
import { fetchPersonBySearch } from '$lib/utils/WordPressCMS';
import type { Person } from '$lib/types/Person';

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

		if (valid && commonName) {
			const payload = { authenticated: true };
			const options = { expiresIn: '1h' };
			const token = jwt.sign(payload, PRIVATE_KEY, options);

			const person: Person | null = await fetchPersonBySearch(commonName);
			if (person) {
				//We absolutely need to set the personID cookie so that we can use it to retrieve data from the Wordpress CMS
				cookies.set('personID', JSON.stringify(person.id), {
					path: '/',
					httpOnly: false, // This allows client-side JavaScript to access it
					maxAge: 3600  // Match the session/token expiration
				});
			}

			// Set JWT cookie with the httpOnly flag, making the cookie unaccessible through JavaScript from the browser
			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				maxAge: 3600
			});

			//Set a second cookie that allows the client-side to access the common name of the user
			cookies.set('commonName', commonName, {
				path: '/',
				httpOnly: false, // This allows client-side JavaScript to access it
				maxAge: 3600  // Match the session/token expiration
			});


			if (commonName.length > 0) {
				throw redirect(STATUS_REDIRECT, `${commonName}`);
			} else {
				console.log('Auth was successful but common name is empty:', commonName);
			}
		} else {
			return fail(STATUS_FORBIDDEN, { incorrect: true, email });
		}
	}
};
