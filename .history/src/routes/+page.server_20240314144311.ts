import type { PageServerLoad } from './$types';
import type { User } from '$lib/types/User';
import type { Actions } from './$types';
import type { UserSmall } from '$lib/db';
import { authenticateUser } from '$lib/db';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users: User[] = await response.json();
	return {
		users
	};
};
