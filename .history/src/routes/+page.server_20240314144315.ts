import type { PageServerLoad } from './$types';
import type { User } from '$lib/types/User';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users: User[] = await response.json();
	return {
		users
	};
};
