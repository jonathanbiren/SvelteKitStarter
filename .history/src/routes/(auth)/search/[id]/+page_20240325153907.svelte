<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	let { data } = $props();
	let person: Person = $state(data.person);
	let imgURL: string = $state(data.imgURL);
	console.log(person);
</script>

<div class="h-1/2 w-1/2">
	<div>
		<UserCardBig {person} {imgURL}></UserCardBig>
	</div>
	<p></p>
	
	<div class="flex flex-row items-center justify-center">
		<button class="btn btn-primary"> This is a button </button>
	</div>
</div>
