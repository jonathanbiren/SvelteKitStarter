import type { LayoutServerLoad } from './$types';
import { LaunchInstanceID } from '../../.svelte-kit/ambient';

export const load = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	return {
		LaunchInstanceID
	}
}) satisfies LayoutServerLoad;
