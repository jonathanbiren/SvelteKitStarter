import { redirect } from "@sveltejs/kit";

export const load =  ({cookies, url}) => {
    if(!cookies.get('authentication') || cookies.get('authentication') !== 'true') {
        throw redirect(302, '/login'); 
    }
};