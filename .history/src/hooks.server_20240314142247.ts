import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const authStatus =  await event.cookies.get('authentication');

    if (authStatus === 'true'){
        console.log(authStatus);
    } else {
        console.log('No authentication was found');
    }; 
    
    return await resolve(event);
};