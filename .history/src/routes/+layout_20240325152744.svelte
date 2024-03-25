<script lang="ts">
	import '../app.pcss';
	import Navigation from '$lib/components/ui/Navigation.svelte';
	let { data } = $props();
	let authStatus: boolean = $state(data.isAuthenicated);
</script>

<Navigation {authStatus} />
<div id="layout" class="flex h-screen-minus-nav flex-col items-center justify-center overflow-auto bg-slate-200">
	<slot />
</div>

