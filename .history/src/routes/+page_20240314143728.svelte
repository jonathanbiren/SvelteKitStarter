<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import type { User } from '../lib/types/User';

	let { data } = $props();
</script>

<div>
	<LoginForm />
</div>
