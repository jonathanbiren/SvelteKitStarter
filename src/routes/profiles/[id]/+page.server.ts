import type { Person } from '$lib/types/Person';
import { fetchPersonByID, fetchPersonImageURL } from '$lib/utils/WordPressCMS';


// We are not currently using the parent dat passed down from the parent routes layout
export const load = async ({
														 params
													 }: {
	params: { id: string };
	parent: () => Promise<{ persons: Person[] }>
}): Promise<{ person: Person; imgURL: string }> => {
	console.log('icon test 4: ', params.id);
	const person: Person | null = await fetchPersonByID(params.id);
	if (person) {
		const imgURL: string = await fetchPersonImageURL(person);
		return {
			person,
			imgURL
		};
	} else {
		throw new Error('Failed to fetch data in slug route');
	}
};
