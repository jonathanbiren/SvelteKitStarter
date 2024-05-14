import { describe, expect, it } from 'vitest';
import {
	APPLICATION_PASSWORD,
	type OrgPersonInfo,
	PERSON_COLLECTION_ORG_ENDPOINT,
	WORDPRESS_USERNAME
} from '$lib/utils/WordPressCMS';

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


describe('fetchAndFlattenData', () => {
	it('should return a non-empty array', async () => {
		// Setup mock response for fetch
		const mockOrgs = ['INF7'];

		// Run the function under test
		const result = await fetchAllData(mockOrgs);

		// Assertions
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThan(0); // Check if the array is not empty

	});
});
