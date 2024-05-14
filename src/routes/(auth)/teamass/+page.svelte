<script lang="ts">
	import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';
	import NameList from '$lib/components/ui/NameList.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let { data } = $props();
	let peopleArray: OrgPersonInfo[] | null = $state(data.orgPersonInfo);
	let personOrgs: string[] | undefined = $state(data.personOrgs);
</script>

{#if personOrgs && peopleArray}
	<div class="max-w-full flex flex-row items-center justify-center">
		{#each personOrgs as heading (uuidv4())}
			<NameList {heading} content={peopleArray.filter(person => person.org.includes(heading))} />
		{/each}
	</div>
{/if}
