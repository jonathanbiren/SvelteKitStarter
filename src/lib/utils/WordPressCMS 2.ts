import type { Person } from '$lib/types/Person';

const PERSON_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/person';
const MEDIA_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/media/';
const PERSON_COLLECTION_SEARCH_ENDPOINT: string =
	'https://cms.communitymirrors.net/wp-json/wp/v2/person?search=';

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

export async function fetchPersonByID(id: string): Promise<Person | null> {
	try {
		const res: Response = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${id}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
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
		console.error(error);
		return '';
	}
}

export async function fetchPersonBySearch(searchQuery: string): Promise<Person | null> {
	try {
		const res: Response = await fetch(`${PERSON_COLLECTION_SEARCH_ENDPOINT}${searchQuery}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const personArray: Person[] = await res.json();
		if (personArray.length !== 0) {
			const person: Person = personArray[0];
			return person;
		}
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
