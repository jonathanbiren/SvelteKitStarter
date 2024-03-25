<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	let { data } = $props();
	let person: Person = $state(data.person);
	let imgURL: string = $state(data.imgURL);
	console.log(person);
	const recipient1 = 'julian'
</script>

<div class="w-1/2">
	<UserCardBig {person} {imgURL}></UserCardBig>
</div>
<a class="btn btn-primary mt-5" href="">Update Profile</a>
<a href="mailto:someone@example.com?subject=The%20Subject&body=The%20body%20of%20the%20email">Send email with subject and body</a>
