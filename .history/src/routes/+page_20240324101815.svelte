<script lang="ts">
	let { data } = $props();
    //Accessing authentication status through the root layout data 
	let authStatus: boolean = $state(data.i);
</script>

<h1>This is the home page</h1>
{#if authStatus}
	<h1 class="text-green-500">You are logged in</h1>
{/if}
