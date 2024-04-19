import type { Person } from '$lib/types/Person';
import { fetchPersonByID, fetchPersonImageURL } from '$lib/utils/WordPressCMS';


// We are not currently using the parent dat passed down from the parent routes layout
export const load = async ({
														 params,
														 parent
													 }: {
	params: { id: string };
	parent: () => Promise<{ persons: Person[] }>
}): Promise<{ data: Person; imgURL: string }> => {
	/*
		const parentData = await parent();
		const personArray: Person[] = parentData.persons;
		const slug: string = params.slug;
		const person: Person | undefined = personArray.find((person) => person.slug === slug);
	*/
	const person: Person | null = await fetchPersonByID(params.id);
	if (person) {
		const imgURL: string = await fetchPersonImageURL(person);
		return {
			data: person,
			imgURL
		};
	} else {
		throw new Error('Failed to fetch data in slug route');
	}
};
