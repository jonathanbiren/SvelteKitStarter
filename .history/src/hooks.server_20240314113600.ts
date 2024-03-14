import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const authStatus =  await event.cookies.get('authentication');

    if (authStatus){
        console.log(authStatus);
    }; 
    
    return await resolve(event);
};