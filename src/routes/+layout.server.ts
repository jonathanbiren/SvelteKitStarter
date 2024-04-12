import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/utils/jwtAuth';

//Once the user successfully logs in and is re-routed to a protected route
//the layout load function will re-run automatically, because it is a parent
//route of the protected route, and SvelteKit manages it this way.
export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt');

	if (token) {
		const { valid } = verifyToken(token);

		if (valid) {
			return {
				isAuthenticated: true
			};
		}
	}

	return {
		isAuthenticated: false
	};
};