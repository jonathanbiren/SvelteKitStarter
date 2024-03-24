import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

async function authenticateUser(email: string, password: string): Promise<boolean> {
	const prisma = new PrismaClient();
	const user = await prisma.userSmall.findUnique({
		where: { email }
	});

	if (!user) {
		return false;
	}

	return bcrypt.compare(password, user.password);
}

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		//E
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user = await authenticateUser(email, password);

		if (user) {
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
