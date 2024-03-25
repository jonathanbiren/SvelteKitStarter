<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	let { data } = $props();
	let person: Person = $state(data.person);
	let imgURL: string = $state(data.imgURL);
    console.log(person);
</script>

<div class="w-1/2 h-1/">
	<UserCardBig {person} {imgURL}></UserCardBig>
	<div>
	<button class="">
		This is a button
	</button>
	</div>
</div>
