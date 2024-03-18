import type { Person } from '$lib/types/Person';
impo
// const id: string = 'biren';
// const id2: string = 'Self-Service';
// const pw: string = 'rTwha9afe$MmQZJn';
// const pw2: string = 'M7IG vSTi 9EQb rDq4 8UOO f1kn';

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
