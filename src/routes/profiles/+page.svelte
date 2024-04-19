<!-- In this file I want to show all the user information that was pulled from the wordpress CMS. I want 
to achieve this by having multiple cards that show the user information -->

<script lang="ts">
	import { pageCounter } from '$lib/stores/pageCounter.svelte';
	import type { Person } from '$lib/types/Person.ts';
	import UserCardSmall from '$lib/components/ui/UserCardSmall.svelte';

	const API_ENDPOINT = 'https://cms.communitymirrors.net/wp-json/wp/v2/person';
	let persons: Person[] = $state([]);

	// TODO: Implement pagination
	async function updatePersons(page: number) {
		const res = await fetch(`${API_ENDPOINT}?page=${page}&per_page=10`);
		persons = await res.json();
	}

	//The $effect rune will run, every time a dependency changes, in this case the count
	$effect(() => {
		updatePersons(pageCounter.currentValue);
	});
</script>

<h1 class="mb-6 text-center text-3xl font-bold text-blue-800">Alle Nutzer</h1>
<div class="h-2/3 w-1/2 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
	{#each persons as person (person.id)}
		<!--
				Passing the slug to the [id] page, where it will be used to fetch the user information
		-->
		<a href="/profiles/{person.id}">
			<UserCardSmall
				firstName={person.acf.firstname}
				lastName={person.acf.lastname}
				status={person.acf.metatags}
				institute={person.acf.org}
				email={person.acf.email || 'No email'}
			/>
		</a>
	{/each}
</div>
<div class="join mt-10">
	<button class="join-item btn" onclick={() => {pageCounter.decrease(); }}>«</button>
	<button class="join-item btn">Page {pageCounter.currentValue}</button>
	<button class="join-item btn" onclick={() => {pageCounter.increase(); }}>»
	</button>
</div>
<div>
	<button class="btn mt-3" onclick={() => {if(pageCounter.currentValue > 1) {pageCounter.reset()}}}>Go back to page 1
	</button>
</div>