<!--
This component is very similar to the 'edit' page, however, it differs in the fact that it needs to pass
the id of the person to the custom form action, since the person we are tying to update is not the person
that is logged in, but the person whose profile we are editing.
-->
<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import { page } from '$app/stores';
	import { DEFAULT_IMG_URL } from '$lib/utils/WordPressCMS';
	import MailToButton from '$lib/components/ui/MailToButton.svelte';

	let { person, imgURL }: { person: Person, imgURL: string } = $props();
	let form = $state($page.form);

	function openModal(event: Event) {
		event.preventDefault();
		const modal = document.getElementById('EmailModal') as HTMLDialogElement;
		modal.showModal();
	}

	const modalMessage: string = `Die E-Mail kann leider nicht aus dem Formular heraus geändert werden. Falls Sie diese ändern wollen
schreiben Sie uns bitte eine Mail. ${`<strong>Drücken sie 'ESC' zum verlassen</strong>`}.`;
	const emailBody: string = `Hallo, mein Name ist ${person?.acf.firstname} ${person?.acf.lastname}, und ich würde gerne die E-mail Adresse auf meiner
Community Mirrors Profilseite aktualisieren.`;
	const buttonText: string = 'E-Mail senden';
</script>


<div class="w-full">
	<div class="flex flex-col items-center justify-items-start">
		<form action="?/updateUserImgWithID" method="POST" enctype="multipart/form-data" class="pb-0">
			<div class="flex flex-col items-center justify-center mb-20">
				<img src={imgURL || DEFAULT_IMG_URL } alt={person?.acf.firstname} class="w-64 h-auto" />
				<input type="file" name="newImage" accept="image/*" class="mb-4 mx-auto" required>
				<input type="hidden" name="userId" value={person?.id}>
				<button type="submit" class="btn btn-accent">
					Change Image
				</button>
			</div>
		</form>
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
		<form method="POST" action="?/updateUserWithID">
			<div class="grid grid-cols-4 bg-slate-300">
				<div class="flex flex-col items-center justify-items-start col-span-2 mx-10">
					<div class="flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">Vorname</p>
						<input name="firstName" type="text" placeholder="Type here" value={person?.acf.firstname}
									 class="input input-bordered w-full max-w-md text-center my-1.5 mx-12" />
					</div>
					<div class="flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">Nachname</p>
						<input name="lastName" type="text" placeholder="Type here" value={person?.acf.lastname}
									 class="input input-bordered w-full max-w-md text-center my-1.5" />
					</div>
					<div class="relative flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">E-Mail</p>
						<input readonly name="email" type="text" placeholder="Type here" value={person?.acf.email}
									 class="input input-bordered w-full max-w-md text-center my-1.5" />
						<input type="hidden" name="userId" value={person?.id}>
						<button class="btn btn-ghost btn-circle btn-sm absolute top-[39px] right-[5px]"
										onclick={(event) => openModal(event)}>
							<span class="material-icons">mail</span>
						</button>
						<dialog id="EmailModal" class="modal">
							<div class="modal-box">
								<h3 class="font-bold text-lg">Guten Tag!</h3>
								<p class="py-4">{@html modalMessage}</p>
								<div class="modal-action">
									<MailToButton {person} {buttonText} {emailBody}></MailToButton>
								</div>
							</div>
						</dialog>
					</div>
					<div class="flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">Funktion</p>
						<input name="role" type="text" placeholder="Type here" value={person?.acf.function}
									 class="input input-bordered w-full max-w-md text-center my-1.5" />
					</div>
					<div class="flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">Raum</p>
						<input name="room" type="text" placeholder="Type here" value={person?.acf.room}
									 class="input input-bordered w-full max-w-md text-center my-1.5" />
					</div>
					<div class="flex flex-col items-center justify-center w-full m-3">
						<p class="font-bold">Forschungsgebiete</p>
						<input name="research" type="text" placeholder="Type here" value={person?.acf.research}
									 class="input input-bordered w-full max-w-md text-center my-1.5" />
					</div>
				</div>
				<div class="col-span-2 h-full">
					<textarea name="content" class="textarea textarea-bordered h-1/2 w-full">{person?.content.rendered}</textarea>
				</div>
			</div>
			<div class="flex flex-row items-center justify-center mt-10">
				<button type="submit" class="btn btn-accent px-16 font-extrabold text-lg">Submit</button>
			</div>
		</form>
	</div>


</div>

