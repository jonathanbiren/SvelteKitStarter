import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const authStatus =  await event.cookies.get('authentication');

    if (authStatus && authStatus === 'true'){
        return await resolve(event); 
    } else {
        redirect(302, '/')
    }; 
    
};