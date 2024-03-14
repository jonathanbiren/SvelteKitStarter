import { Handle } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const a =  await event.cookies.get('authentication');
    
    
};