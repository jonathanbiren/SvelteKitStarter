<script lang="ts">
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	import type { Person } from '$lib/types/Person';

	let { data } = $props();
	let person: Person = $state(data.data);
	const imgURL: string = $state(data.imgURL); 
</script>

<div class="w-1/2 flex flex-col justify-center items-center">
	<UserCardBig {person} {imgURL}></UserCardBig>
</div>
