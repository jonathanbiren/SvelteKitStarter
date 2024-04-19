<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardSmall from '$lib/components/ui/UserCardSmall.svelte';
	import { fetchPeopleBySearch } from '$lib/utils/WordPressCMS';
	import { pageCounter } from '$lib/stores/pageCounter.svelte';
	let searchQuery: string = $state('');
	let persons: Person[] = $state([]);

	//* Extract this function into a util file, since you also need it for the search inside
	//* the [fullName] page
	async function performSearch(event: Event) {
		event.preventDefault();
		const searchResult: Person[] | null = await fetchPeopleBySearch(searchQuery);
		if (searchResult) {
			persons = searchResult;
			searchQuery = '';
		} else {
			// TODO: Create a toast message that lets the user know the no users were found
			persons = [];
		}
	}

	$effect(() => {
		let searchField: HTMLInputElement = document.getElementById('searchField') as HTMLInputElement;
		searchField.focus();
	});
</script>

<div class="w-1/2">
	<form onsubmit={performSearch}>
		<div class="flex flex-row justify-center">
			<input
				id="searchField"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={searchQuery}
			/>
			<button class="btn btn-primary ml-2">Suchen</button>
		</div>
	</form>
</div>

{#if persons.length > 0}
	<div class="h-2/3 w-1/2 overflow-auto">
		{#each persons as person (person.id)}
			<a href="/search/{person.id}">
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
{/if}
