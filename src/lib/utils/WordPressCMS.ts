import type { Person } from '$lib/types/Person';

export const WORDPRESS_USERNAME = 'biren';
export const APPLICATION_PASSWORD = '11kCkXnqezvzskk1GvuqLH76';

export const DEFAULT_IMG_URL: string = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
export const ACF_FIELDS_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/acf/v2/';
export const PERSON_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/person';
export const MEDIA_COLLECTION_ENDPOINT: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/media/';
export const PERSON_COLLECTION_SEARCH_ENDPOINT: string =
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
		console.error('This person does not have an image');
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
