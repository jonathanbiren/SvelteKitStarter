import type { PageServerLoad } from './$types';
import type { Person } from '$lib/types/Person';
import { fetchPersonByID, fetchPersonImageURL } from '$lib/utils/WordPressCMS';
import { redirect } from '@sveltejs/kit';

//We are currently not using the inherent fetch function that the load function provides
//We will need to check whether this causes issues in the future
export const load: PageServerLoad = async ({
																						 params
																					 }): Promise<{ person: Person; imgURL: string }> => {
	const id = params.id;
	console.log(params.id);
	const person: Person | null = await fetchPersonByID(id);
	if (person !== null) {
		const imgURL: string = await fetchPersonImageURL(person);
		console.log(person.acf.firstname);
		console.log(imgURL);
		return {
			person,
			imgURL
		};
	} else {
		console.log('person ID was not found');
		throw redirect(303, '/search');
	}
};
