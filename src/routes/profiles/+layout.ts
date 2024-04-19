import type { Person } from '$lib/types/Person';
import type { ServerLoad } from '@sveltejs/kit';


const ENDPOINT = 'https://cms.communitymirrors.net/wp-json/wp/v2/person?page=1&per_page=10';

export const load: ServerLoad = async ({fetch}): Promise<{ persons: Person[] }> => {
	const res = await fetch(ENDPOINT);
	if (res.ok) {
		const data: Person[] = await res.json();
		if (data) {
			return {
				persons: data
			};
		}
	}
	throw new Error('Failed to fetch data');
};
