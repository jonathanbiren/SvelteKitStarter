import { fetchAndFlattenData, fetchPersonByID } from '$lib/utils/WordPressCMS';
import type { Person } from '$lib/types/Person';
import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';

// You should probably put this in the routes layout.ts file
export const load = async ({ cookies }) => {
	const personID = cookies.get('personID');

	if (!personID) {
		return { orgPersonInfo: null };
	}

	const person: Person | null = await fetchPersonByID(personID);

	if (!person) {
		return { orgPersonInfo: null };
	}

	const personOrgs = person.acf.org.split(',');

	const orgPersonInfo: OrgPersonInfo[] = await fetchAndFlattenData(personOrgs);

	return {
		orgPersonInfo,
		personOrgs
	};
};
