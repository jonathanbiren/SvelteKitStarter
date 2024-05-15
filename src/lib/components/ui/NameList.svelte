<script lang="ts">
	import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';
	import { derived } from 'svelte/store';

	let { heading, personInfoList }: { heading: string; personInfoList: OrgPersonInfo[] } = $props();
	let searchQuery = $state('');
	//I have no clue why the static code analysis is marking this as an error, but it's working just fine
	let searchConditionList: OrgPersonInfo[] = $derived(personInfoList.filter(person => person.title.toLowerCase().includes(searchQuery.toLowerCase())));
</script>

<div class="">
	<div class="text-center mb-2 py-2">
		<h2 class="text-lg font-semibold">{heading}: {personInfoList.length}</h2>
	</div>
	<div class="max-h-96 overflow-y-scroll w-56 border-2 border-gray-400 mx-8 bg-white">
		<div class="h-full">
			{#each searchConditionList as person, index (person.id)}
				<p class="pl-2">{1 + index}. {person.title}</p>
				<p></p>
			{/each}
		</div>
	</div>
	<input type="text" bind:value={searchQuery} class="w-56 mx-8 mt-5 text-center p-2 border-2 border-black"
				 placeholder="Suchen">
</div>
