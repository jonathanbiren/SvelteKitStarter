import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authStatus = event.cookies.get('authentication'); 

    if(event.url.pathname !== '/login' && authStatus !== 'true') {
        if{!authStatus || auth}
    }
};
