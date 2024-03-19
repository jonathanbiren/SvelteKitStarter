<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	let { data } = $props();
	let authStatus: boolean = $state(data.isAuthenicated);
</script>

<div>
	<LoginForm authStatus={authStatus}/>
</div>
