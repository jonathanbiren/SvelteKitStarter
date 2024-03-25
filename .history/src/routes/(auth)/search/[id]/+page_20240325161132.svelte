<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	let { data } = $props();
	let person: Person = $state(data.person);
	let imgURL: string = $state(data.imgURL);
	console.log(person);
	const recipients: string[] = ['julian.fietkau@unibw.de', 'laura.stojko@unibw.de'];
	const subject = `Update Community Mirror Profile: ${person.acf.firstname} ${person.acf.lastname}`;
	const emailBody = `Hello, my name is ${person.acf.firstname} ${person.acf.lastname} and I would like to update the following information on my profile: %0A%0A`;
</script>

<div class="w-1/2">
	<UserCardBig {person} {imgURL}></UserCardBig>
</div>
<a href="mailto:{recipients.join(',')}?subject={subject}&body={emailBody}"
	
	>Send email with subject and body</a
>
