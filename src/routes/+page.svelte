<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import type { User } from '../lib/types/User';

	let showParagraph: boolean = $state(false);
	let { data } = $props();
	let users: User[] = $state(data.users);
</script>

<div>
	{#if showParagraph}
		{#each users as user (user.id)}
			<p>
				<span>{user.name}</span>
				<span>({user.address.geo.lat}) ({user.address.geo.lng})</span>
			</p>
		{/each}
	{:else}
		<LoginForm />
	{/if}

	<button onclick={() => (showParagraph = !showParagraph)} class="btn btn-primary mt-3"
		>This is a DaisyUI button</button
	>
</div>
