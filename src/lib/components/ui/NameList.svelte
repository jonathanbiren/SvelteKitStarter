<script lang="ts">
	import type { OrgPersonInfo } from '$lib/utils/WordPressCMS';

	let { heading, content }: { heading: string; content: OrgPersonInfo[] } = $props();
</script>

<div>
	<div class="text-center mb-2 py-2">
		<h2 class="text-lg font-semibold">{heading}</h2>
	</div>
	<div class="max-h-96 overflow-y-scroll w-56 border-2 border-gray-400 mx-8 bg-blue-200">
		<div class="h-full">
			{#each content as person, index (person.id)}
				<p class="pl-2">{1 + index}. {person.title}</p>
			{/each}
		</div>
	</div>
</div>
