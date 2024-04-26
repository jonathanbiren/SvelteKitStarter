<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import { page } from '$app/stores';

	let { data } = $props();
	let person: Person | null | undefined = $state(data.person);
	let form = $state($page.form);
</script>

<!--
<form method="POST" action="?/updateUser">
	<input type="text" name="title" id="name" placeholder={person?.title.rendered} />
	<input type="text" name="firstName" id="name" placeholder={person?.acf.firstname} />
	<button type="submit">Submit</button>
</form>-->

<div class="w-full h-full">
	<form method="POST" action="?/updateUser" class="w-full h-full">
		<div class="grid grid-cols-3 w-2/3 h-1/2 bg-green-400">
			<div class="flex flex-col items-center justify-items-start col-span-2 bg-red-300 ">
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">Vorname</p>
					<input name="firstName" type="text" placeholder="Type here" value={person?.acf.firstname}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">Nachname</p>
					<input name="lastName" type="text" placeholder="Type here" value={person?.acf.lastname}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">E-Mail</p>
					<input name="email" type="text" placeholder="Type here" value={person?.acf.email}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">Funktion</p>
					<input name="role" type="text" placeholder="Type here" value={person?.acf.function}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">Raum</p>
					<input name="room" type="text" placeholder="Type here" value={person?.acf.room}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
				<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
					<p class="font-bold">Forschungsgebiete</p>
					<input name="research" type="text" placeholder="Type here" value={person?.acf.research}
								 class="input input-bordered w-full max-w-md text-center my-1.5" />
				</div>
			</div>
			<div class="col-span-1 bg-blue-500 h-full"></div>
		</div>
		<div class="flex flex-row items-center justify-center mt-10">
			<button type="submit" class="btn btn-accent px-16 font-extrabold text-lg">Submit</button>
		</div>

		<div class="w-full text-center mt-5">
			<div>
				{#if form}
					{#if form.success}
						<p class="text-green-700 font-bold text-md">Profile successfully updated</p>
					{:else if !form.success}
						<p class="text-red-600 font-bold text-lg">Error occured when trying to update profile</p>
					{/if}
				{/if}
			</div>
		</div>
	</form>
</div>

