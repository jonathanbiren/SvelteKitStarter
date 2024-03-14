import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, }) => {
    const authStatus = cookies
};