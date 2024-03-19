<script lang="ts">
	let { data } = $props();
	let authStatus: boolean = $state(data.isAuthenicated);
</script>

<h1>This is the home page</h1>
{#if authStatus}
<h1 class="-green-200 text-green-500">You are logged in</h1>
{/if}
