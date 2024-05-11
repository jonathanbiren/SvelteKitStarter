import { fetchPersonByID } from '$lib/utils/WordPressCMS';
import type { Person } from '$lib/types/Person';


export const load = async ({ cookies }) => {

	const personID = cookies.get('personID');
	let person: Person | null;
	let personOrgs: string[];
	if (personID) {
		person = await fetchPersonByID(personID);
		if (person) {
			personOrgs = person.acf.org.split(',');

			for (const org of personOrgs) {
				console.log(org);
			}
		}
	}

};