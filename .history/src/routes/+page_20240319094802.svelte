<script lang="ts">
	import +layout from './+layout.svelte';
    let {data} = $props(); 
    let authStatus = $state(data.+layout); 
</script>

<h1>This is the home page</h1>
