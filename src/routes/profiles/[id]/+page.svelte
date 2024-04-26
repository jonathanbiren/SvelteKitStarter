<script lang="ts">
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	import type { Person } from '$lib/types/Person';
	import MailToButton from '$lib/components/ui/MailToButton.svelte';

	let { data } = $props();
	let person: Person = $state(data.data);
	const imgURL: string = $state(data.imgURL); 
</script>

<div class="w-1/2 flex flex-col justify-center items-center">
	<UserCardBig {person} {imgURL}></UserCardBig>
	<MailToButton {person}></MailToButton>
</div>
