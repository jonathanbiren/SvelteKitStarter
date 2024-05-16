import type { Person } from '$lib/types/Person';

export const WORDPRESS_USERNAME = 'biren';
export const APPLICATION_PASSWORD = '11kCkXnqezvzskk1GvuqLH76';

export const DEFAULT_IMG_URL: string = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';
export const ACF_FIELDS_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/acf/v2/';
export const PERSON_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/person';
export const PERSON_COLLECTION_MAIL_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/person/email=';
export const MEDIA_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/media/';
export const PERSON_COLLECTION_SEARCH_ENDPOINT: string =
	'https://cms.communitymirrors.net/wp-json/wp/v2/person?search=';
export const PERSON_COLLECTION_ORG_ENDPOINT = 'https://cms.communitymirrors.net/wp-json/wp/v2/people/org/?org=';

interface MediaDetails {
	sizes: {
		full: {
			source_url: string;
		};
	};
}

interface ImageResponse {
	media_details?: MediaDetails;
}

export interface PersonInfo {
	id: number;
	title: string;
	content: string;
}

export interface OrgPersonInfo {
	id: number;
	title: string;
	link: string;
	org: string;
}

export async function fetchPersonByID(id: string): Promise<Person | null> {
	try {
		const res: Response = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${id}`);
		if (!res.ok) {
			throw new Error('Error occured when trying to fetch person by ID');
		}
		const person: Person = await res.json();
		return person;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function fetchPersonImageURL(person: Person): Promise<string> {
	try {
		const mediaID: number = person.featured_media;
		const imgResponse: Response = await fetch(`${MEDIA_COLLECTION_ENDPOINT}${mediaID}`);
		if (!imgResponse.ok) {
			throw new Error(`HTTP error! status: ${imgResponse.status}`);
		}
		const imgMetaData: ImageResponse = await imgResponse.json();
		const imgURL: string = imgMetaData.media_details?.sizes.full.source_url || '';
		return imgURL;
	} catch (error) {
		return '';
	}
}

//This function returns the first Person found by the search query
export async function fetchPersonBySearch(searchQuery: string): Promise<Person | null> {
	try {
		const res: Response = await fetch(`${PERSON_COLLECTION_SEARCH_ENDPOINT}${searchQuery}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const personArray: Person[] = await res.json();
		if (personArray.length !== 0) {
			return personArray[0];
		}
	} catch (error) {
		console.error(error);
	}
	return null;
}

//Function that uses the custom endpoint to search a person by email
export async function fetchPersonByMail(mail: string): Promise<Person | null> {
	try {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
			}
		};

		const res: Response = await fetch(`${PERSON_COLLECTION_MAIL_ENDPOINT}${mail}`, requestOptions);
		if (!res.ok) {
			throw new Error(`Error occured during mail based fetch: ${res.status}`);
		}
		const data: PersonInfo = await res.json();
		const personID: string = data.id.toString();

		console.log('icon test 1: ', personID);
		return await fetchPersonByID(personID);
	} catch (error) {
		console.error(error);
	}
	return null;
}

//This function returns the entire Persons array found by the search query
export async function fetchPeopleBySearch(searchQuery: string): Promise<Person[] | null> {
	try {
		const res: Response = await fetch(`${PERSON_COLLECTION_SEARCH_ENDPOINT}${searchQuery}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const personArray: Person[] = await res.json();
		return personArray;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Returns an array of arrays, with the inner arrays containing objects of the type OrgPersonInfo
async function fetchAllData(organisations: string[]): Promise<OrgPersonInfo[][]> {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
		}
	};

	const promises = organisations.map(org =>
		fetch(`${PERSON_COLLECTION_ORG_ENDPOINT}${org}`, requestOptions).then(response => response.json())
	);

	try {
		const settledPromises = await Promise.allSettled(promises);
		const results = settledPromises.map(promise => {
			if (promise.status === 'fulfilled') {
				return promise.value;
			} else {
				console.error('Failed to fetch data:', promise.reason);
				return []; // Handle rejected promise
			}
		});
		return results;
	} catch (error) {
		console.error('An unexpected error occurred:', error);
		throw error; // This catch is for any unexpected errors, though unlikely here.
	}
}


export async function fetchAndFlattenData(organisations: string[]) {
	try {
		const nestedResults = await fetchAllData(organisations);
		const flatResults = nestedResults.flat(); // Use Array.prototype.flat() to flatten the array
		return removeDuplicates(flatResults);
	} catch (error) {
		console.error('An error occurred while fetching and flattening data:', error);
		throw error;
	}
}

//Just a utility function to filter out the duplicate for the fetchAndFlattenData function
function removeDuplicates(data: OrgPersonInfo[]): OrgPersonInfo[] {
	const seenIDs = new Set<number>();
	return data.filter(person => {
		if (seenIDs.has(person.id)) {
			return false;
		} else {
			seenIDs.add(person.id);
			return true;
		}
	});
}

