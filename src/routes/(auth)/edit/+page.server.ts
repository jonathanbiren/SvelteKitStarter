import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPersonByID } from '$lib/utils/WordPressCMS';
import type { Person } from '$lib/types/Person';
import {
	PERSON_COLLECTION_ENDPOINT,
	APPLICATION_PASSWORD,
	WORDPRESS_USERNAME,
	ACF_FIELDS_ENDPOINT
} from '$lib/utils/WordPressCMS';

export const load: PageServerLoad = async ({ cookies }) => {
	const personID = cookies.get('personID');
	if (personID) {
		const person: Person | null = await fetchPersonByID(personID);
		return { person };
	}
};


export const actions: Actions = {
	updateUser: async ({ request, cookies, fetch }) => {
		const personID = cookies.get('personID');
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const title = formData.get('title') as string;

		const data = {
			title
		};

		const optionsStandard = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
			},
			body: JSON.stringify(data)
		};

		const optionsACF = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
			},
			body: JSON.stringify({
				fields: {
					firstname: firstName
				}
			})
		};

		try {
			const responseStandard = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${personID}`, optionsStandard);
			const responseACF = await fetch(`${ACF_FIELDS_ENDPOINT}${personID}`, optionsACF);
			console.log('responsteStandard.ok' + responseACF.ok, 'responseACF.ok' + responseACF.ok);
			if (responseStandard.ok && responseACF.ok) {
				return {
					success: true
				};
			}
		} catch (error) {
			console.error(error);
			return {
				success: false
			};
		}
	}
};
