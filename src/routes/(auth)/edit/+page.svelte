<script lang="ts">
	import type { Person } from '$lib/types/Person';
	let { data } = $props();
	let person: Person = $state(data.person);

</script>

<h1>{person.acf.firstname}</h1>
<form method="POST" action="?/updateUser">
	<input type="text" name="title" id="name" placeholder={person.title.rendered} />
	<input type="text" name="firstName" id="name" placeholder={person.acf.firstname} />
	<button type="submit">Submit</button>
</form>