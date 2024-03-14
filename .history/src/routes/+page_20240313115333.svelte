<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import type { User } from '../lib/types/User';

	let showParagraph: boolean = $state(false);
	let { data } = $props();
	let users: User[] = $state(data.users);
</script>

<div>
	<LoginForm />
</div>
