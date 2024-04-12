<script lang="ts">
	import type { Person } from '$lib/types/Person';

	let { person } = $props<{person: Person}>();
	const recipients: string[] = ['inforadiator@unibw.de'];
	const subject = `Update Community Mirror Profile: ${person.acf.firstname} ${person.acf.lastname}`;
	const emailBody = `Hello, my name is ${person.acf.firstname} ${person.acf.lastname} and I would like to update the following information on my community mirrors profile:`;
</script>

<a
	href="mailto:{recipients.join(',')}?subject={subject}&body={emailBody}"
	class="mt-4 btn btn-neutral">Update Profile</a
>
