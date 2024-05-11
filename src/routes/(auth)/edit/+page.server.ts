import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPersonByID, fetchPersonImageURL, MEDIA_COLLECTION_ENDPOINT } from '$lib/utils/WordPressCMS';
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
		console.log('icon test 3: ', personID);
		const person: Person | null = await fetchPersonByID(personID);
		let imgURL;
		if (person) {
			imgURL = await fetchPersonImageURL(person);
		}
		return { person, imgURL };
	}
};


export const actions: Actions = {
	updateUser: async ({ request, cookies, fetch }) => {
		const personID = cookies.get('personID');
		const formData = await request.formData();
		const {
			firstName,
			lastName,
			email,
			role,
			room,
			research,
			content
		} = Object.fromEntries(formData);
		const dataStandard = { content };


		const optionsStandard = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
			},
			body: JSON.stringify(dataStandard)
		};

		const optionsACF = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
			},
			body: JSON.stringify({
				fields: {
					firstname: firstName,
					lastname: lastName,
					email: email,
					function: role,
					room: room,
					research: research
				}
			})
		};

		try {
			const responseStandard = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${personID}`, optionsStandard);
			const responseACF = await fetch(`${ACF_FIELDS_ENDPOINT}${personID}`, optionsACF);
			console.log('responsteStandard.ok ' + responseACF.ok, 'responseACF.ok ' + responseACF.ok);
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
	},
	updateUserImage: async ({ request, cookies, fetch }) => {
		const personID = cookies.get('personID');
		const formData = await request.formData();
		const newImage = formData.get('newImage') as File;
		const myHeaders = new Headers();
		myHeaders.append('Content-Disposition', `"attachment; filename=${newImage.name}"`);
		myHeaders.append('Authorization', 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD));
		const requestData = new FormData();
		requestData.append('file', newImage);

		const imageRequestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: requestData
		};

		let newMediaID: string;
		let oldMediaID: string;
		try {
			//First we upload the image to the media collection
			let response = await fetch(`${MEDIA_COLLECTION_ENDPOINT}`, imageRequestOptions);
			let data = await response.json();
			//We then grab the id of the uploaded image
			newMediaID = data.id;

			//We then grab the id of the old image
			response = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${personID}`, { method: 'GET' });
			data = await response.json();
			oldMediaID = data.featured_media;


			const personRequestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
				},
				body: JSON.stringify(
					{
						featured_media: newMediaID
					}
				)
			};

			//We update the person post to point to the new image
			try {
				const personResponse = await fetch(`${PERSON_COLLECTION_ENDPOINT}/${personID}`, personRequestOptions);
			} catch (error) {
				console.error('Error occured when updating the persons media ID');
			}

			//Lastly we delete the old image. The force=true is needed to delete the image from the media collection
			try {
				const deleteOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa(WORDPRESS_USERNAME + ':' + APPLICATION_PASSWORD)
					},
					body: JSON.stringify({ force: true })
				};
				const mediaResponse = await fetch(`${MEDIA_COLLECTION_ENDPOINT}${oldMediaID}?force=true`, deleteOptions);
			} catch (error) {
				console.error('Error occured when trying to delete the old image');
			}


		} catch (error) {
			console.error(error);
		}


	}
};

