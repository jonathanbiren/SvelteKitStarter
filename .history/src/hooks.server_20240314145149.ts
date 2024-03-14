import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authStatus = event.cookies.get('authentication');

	//Check whether the path name is different to one of the routes you don't need to
	// be authenticated to access
	if (event.url.pathname !== '/login'  event.url.pathname !== '/') {
		//Check authentication status
		if (!authStatus || authStatus !== 'true') {
			//Redirect to the login page
			throw redirect(302, '/login');
		}

		return await resolve(event);
	}
};
