import { redirect } from "@sveltejs/kit";

export const load = async ({cookies, url}) => {
    if(!cookies.get(''))
};