<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './LoginForm.svelte';

	let { data } = $props();
</script>

<div>
	<LoginForm />
</div>
