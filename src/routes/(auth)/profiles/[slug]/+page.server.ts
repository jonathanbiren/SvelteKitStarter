import type { PageServerLoad } from './$types';
import type { Person } from '$lib/types/Person';

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

export const load: PageServerLoad = async ({
	params,
	parent
}): Promise<{ data: Person; imgURL: string }> => {
	const parentData = await parent();
	const personArray: Person[] = parentData.persons;
	const slug: string = params.slug;
	const person: Person | undefined = personArray.find((person) => person.slug === slug);

	if (person) {
		const APIEndpoint: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/media/';
		const mediaID: number = person.featured_media;
		const imageURL: string = `${APIEndpoint}${mediaID}`;
		const imgResponse = await fetch(imageURL);
		const imgData: ImageResponse = await imgResponse.json();
		const imgURL: string = imgData.media_details?.sizes.full.source_url || '';

		return {
			data: person,
			imgURL
		};
	} else {
		throw new Error('Failed to fetch data in slug route');
	}
};
