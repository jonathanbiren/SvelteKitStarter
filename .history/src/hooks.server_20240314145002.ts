import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authStatus = event.cookies.get('authentication');

    //Check whether the path name is 
	if (event.url.pathname !== '/login' && authStatus !== 'true') {
		if (!authStatus || authStatus !== 'true') {
			throw redirect(302, '/login');
		}

        return await resolve(event);
	}
};
