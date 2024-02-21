<script>
	import Navigation from './../components/ui/Navigation.svelte';
	import '../app.pcss';
</script>

<Navigation />

<div class="flex flex-row justify-center pt-20">
	<slot />
</div>
