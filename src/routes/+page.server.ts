import type { PageServerLoad } from './$types';
import type {User} from '$lib/types/User';


export const load = (async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data: User[] = await response.json();
	return {
			users: data
		}
}) satisfies PageServerLoad;
