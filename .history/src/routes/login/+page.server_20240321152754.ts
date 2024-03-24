import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private';
import { PrismaClient} from '@prisma/client';
import type { UserSmall } from '@prisma/client';

function findUser(email: string, password: string) : UserSmall | null {
		const prisma = new PrismaClient();
		const user = prisma.userSmall.findUnique({
			where: {email},
		}) 
		return user; 
}


export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;



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

			cookies.set('jwt', token, { path: '/',
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
