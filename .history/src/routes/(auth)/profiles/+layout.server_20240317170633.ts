import type { Person } from '$lib/types/Person';
import type { PageLoad } from './$types';

const endpoint = 'https://cms.communitymirrors.net/wp-json/wp/v2/person';

export const load: PageLoad = async (): Promise<{ persons: Person[] }> => {
	const res = await fetch(endpoint);
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
