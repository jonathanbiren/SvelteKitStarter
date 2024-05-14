<script lang="ts">
	import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';

	let { data } = $props();
	let peopleArray: OrgPersonInfo[] | null = $state(data.orgPersonInfo);
</script>

{#if peopleArray}
	{#each peopleArray as person, index (person.id)}
		<p>{index + 1}. {person.title}</p>
	{/each}
{:else }
	<p>No people found</p>
{/if}

