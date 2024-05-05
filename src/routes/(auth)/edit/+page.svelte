<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import { page } from '$app/stores';
	import { DEFAULT_IMG_URL } from '$lib/utils/WordPressCMS';

	let { data } = $props();
	let person: Person | null | undefined = $state(data.person);
	let imgURL: string | undefined = $state(data.imgURL);
	let form = $state($page.form);
</script>


<div class="w-full">
	<div class="flex flex-col items-center justify-items-start">
		<form action="?/updateUserImage" method="POST" enctype="multipart/form-data">
			<div class="flex flex-col items-center justify-center mb-20">
				<img src={imgURL || DEFAULT_IMG_URL } alt={person?.acf.firstname} class="w-1/2 h-auto" />
				<input type="file" name="newImage" accept="image/*" class="mb-4 mx-auto" required>
				<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Change Image
				</button>
			</div>
		</form>
		<form method="POST" action="?/updateUser">
			<div class="grid grid-cols-4  bg-green-400">
				<div class="flex flex-col items-center justify-items-start col-span-2 bg-red-300 mx-10">
					<div class="flex flex-col items-center justify-center bg-yellow-300 w-full m-3">
						<p class="font-bold">Vorname</p>
						<input name="firstName" type="text" placeholder="Type here" value={person?.acf.firstname}
									 class="input input-bordered w-full max-w-md text-center my-1.5 mx-12" />
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
				<div class="col-span-2 bg-blue-500 h-full">
					<textarea name="content" class="textarea textarea-bordered h-1/2 w-full">{person?.content.rendered}</textarea>
				</div>
			</div>
			<div class="flex flex-row items-center justify-center mt-10">
				<button type="submit" class="btn btn-accent px-16 font-extrabold text-lg">Submit</button>
			</div>
		</form>
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
</div>

