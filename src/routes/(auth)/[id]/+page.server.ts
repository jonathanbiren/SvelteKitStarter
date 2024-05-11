import type { PageServerLoad } from './$types';
import type { Person } from '$lib/types/Person';
import { redirect } from '@sveltejs/kit';
import { fetchPersonByID, fetchPersonImageURL } from '$lib/utils/WordPressCMS';

export const load: PageServerLoad = async ({
																						 params
																					 }: { params: { id: string } }): Promise<{
	person: Person;
	imgURL: string
}> => {
	//Inside this function we want to perform the search on the CMS, and return a single person object based on the searchQuery passed to us from the login route
	console.log('icon test 2: ', params.id);
	const person: Person | null = await fetchPersonByID(params.id);
	if (person !== null) {
		console.log('Person was found by using id');
		const imgURL: string = await fetchPersonImageURL(person);
		return {
			person,
			imgURL
		};
	} else {
		//It is very much possible that the search does not return any results, in which case we want to redirect the user back to the search page
		console.log('Person was not found TEST');
		throw redirect(303, '/search');
	}
};
