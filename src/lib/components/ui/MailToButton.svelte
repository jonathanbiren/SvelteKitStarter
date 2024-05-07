<script lang="ts">
	import type { Person } from '$lib/types/Person';

	let { person, buttonText, emailBody } = $props<{ person: Person, buttonText: string, emailBody: string }>();
	const recipients: string[] = ['inforadiator@unibw.de'];
	const subject = `Update Community Mirror Profile: ${person.acf.firstname} ${person.acf.lastname}`;
</script>

<a
	href="mailto:{recipients.join(',')}?subject={subject}&body={emailBody}"
	class="mt-4 btn btn-neutral">{buttonText}</a
>
