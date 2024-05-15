<script lang="ts">
	import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';

	let { heading, personInfoList }: { heading: string; personInfoList: OrgPersonInfo[] } = $props();
</script>

<div>
	<div class="text-center mb-2 py-2">
		<h2 class="text-lg font-semibold">{heading} ({personInfoList.length})</h2>
	</div>
	<div class="max-h-96 overflow-y-scroll w-56 border-2 border-gray-400 mx-8 bg-blue-200">
		<div class="h-full">
			{#each personInfoList as person, index (person.id)}
				<p class="pl-2">{1 + index}. {person.title}</p>
				<p></p>
			{/each}
		</div>
	</div>
</div>
