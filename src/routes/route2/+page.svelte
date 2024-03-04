<!-- In this file I want to show all the user information that was pulled from the wordpress CMS. I want 
to achieve this by having multiple cards that show the user information -->

<script lang="ts">
	import type { Person } from '$lib/types/Person.ts';
	import UserCardSmall from '$lib/components/ui/UserCardSmall.svelte';
	let { data } = $props();
	let persons: Person[] = $state(data.persons);
</script>

<h1 class="mb-6 text-center text-3xl font-bold text-blue-800">Alle Nutzer</h1>
<div class="h-2/3 w-1/2 overflow-auto">
	{#each persons as person (person.id)}
		<a href="/route2/{person.slug}">
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
