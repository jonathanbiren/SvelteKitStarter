import { Handle } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export const handle: Handle = async ({ request, resolve }) => {
  const response = await resolve(request);

  if (response) {
    return response;
  }

  return error({ status: 404 });
};