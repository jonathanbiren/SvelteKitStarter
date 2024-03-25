<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardSmall from '$lib/components/ui/UserCardSmall.svelte';
	let searchQuery: string = $state('');
	let persons: Person[] = $state([]);
	let message: string = $state('');

	async function performSearch(event: Event) {
		event.preventDefault();
		const response = await fetch(
			`https://cms.communitymirrors.net/wp-json/wp/v2/person?search=${searchQuery}`
		);
		if (response.ok) {
			const searchResult: Person[] = await response.json();
			persons = searchResult;
			searchQuery = '';
		} else {
			persons = [];
			throw new Error('Failed to fetch search results');
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
	<button></button>
{/if}
