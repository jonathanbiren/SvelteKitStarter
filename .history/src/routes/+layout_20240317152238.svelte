<script lang="ts">
	import '../app.pcss';
	import Navigation from '$lib/components/ui/Navigation.svelte';
</script>

<Navigation />
<div class="flex h-screen flex-col items-center justify-center overflow-auto bg-slate-200">
	<slot />
</div>
