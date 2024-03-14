<script lang="ts">
	import type { PageData } from './$types';

	let {data} = $props(); 
</script>



<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
</script>

<div>
	<LoginForm />
</div>
