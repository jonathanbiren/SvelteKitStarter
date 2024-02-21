<script lang="ts">
	import type { User } from '../lib/types/User';

	let showParagraph: boolean = $state(false);
	let { data } = $props();
	let users: User[] = $state(data.users);
</script>

<div>
	<button onclick={() => (showParagraph = !showParagraph)} class="btn btn-primary mt-3"
		>This is a DaisyUI button</button
	>

	{#if showParagraph}
		<p class="mt-3 text-center">This is a DaisyUI paragraph</p>
	{/if}
	{#each users as user (user.id)}
		<p>
			<span>({user.address.geo.lat}) ({user.address.geo.lng})</span>
		</p>
	{/each}
</div>
