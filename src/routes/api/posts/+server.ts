import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	console.log(event);

	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();
	return json(posts);
};
