import type { Person } from '$lib/types/Person';
import { fetchPersonByID, fetchPersonImageURL, PERSON_COLLECTION_ENDPOINT } from '$lib/utils/WordPressCMS';

export const load = async ({ params, fetch }) => {
		try {
			const res: Response = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${params.id}`);
			if (!res.ok) {
				throw new Error('Error occured when trying to fetch person by ID');
			}
			const person: Person = await res.json();

			const imgURL = await fetchPersonImageURL(person);
			return { person, imgURL };
		} catch (err) {
			console.log('Error occured in load function of teamass/[id] route')
		}
	}


export const actions = {
	updateUserWithID: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');
		console.log('User ID from teamsass form: ', userId);
	}
};