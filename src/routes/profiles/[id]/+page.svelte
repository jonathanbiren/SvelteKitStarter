<script lang="ts">
	import UserCardBig from '$lib/components/ui/UserCardBig.svelte';
	import type { Person } from '$lib/types/Person';
	import MailToButton from '$lib/components/ui/MailToButton.svelte';

	let { data } = $props();
	let person: Person = $state(data.person);
	const imgURL: string = $state(data.imgURL);

	const buttonText: string = 'Aktualisieren';
	const emailBody: string = `Hallo, mein Name ist ${person.acf.firstname} ${person.acf.lastname}, und ich würde gerne folgende Daten auf meinem
	Community Mirrors Profil aktualisieren: \n\n`;
</script>

<div class="flex flex-col justify-center items-center w-1/2">
	<UserCardBig {person} {imgURL}></UserCardBig>
	<MailToButton {person} {buttonText} {emailBody}></MailToButton>
</div>
