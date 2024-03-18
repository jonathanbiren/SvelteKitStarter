import type { PageLoad } from './$types';
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

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.id;
    console.log(params.id)
	const res = await fetch(`https://cms.communitymirrors.net/wp-json/wp/v2/person/${id}`);
	if (res.ok) {
		const person: Person = await res.json();
		const APIEndpoint: string = 'https://cms.communitymirrors.net/wp-json/wp/v2/media/';
		const mediaID: number = person.featured_media;
		const imgResponse = await fetch(`${APIEndpoint}${mediaID}`);
		const imgMetaData: ImageResponse = await imgResponse.json();
		const imgURL: string = imgMetaData.media_details?.sizes.full.source_url || '';

		return {
			person,
			imgURL
		};
	} else {
		throw new Error('Failed to fetch data in id route');
	}
};
