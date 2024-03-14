import { Handle } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const cookieHeader =  await event.request.headers.get('cookie');
    
    
};