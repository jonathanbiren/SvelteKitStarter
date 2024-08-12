<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import {DEFAULT_IMG_URL} from '$lib/utils/WordPressCMS';
	//This is how you can use TypeScript to define the type of the props
	let { person, imgURL } = $props<{ person: Person; imgURL: string }>();
</script>

<div class="">
	<div role="tablist" class="tabs tabs-bordered tabs-lg w-full">
		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Allgemein" checked />
		<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-1">
			<div class="grid grid-cols-3 items-stretch">
				<div class="col-span-1">
					<img src={imgURL || DEFAULT_IMG_URL} alt="No User img" class="object-cover" />
				</div>
				<div class="col-span-1">
					<div class="flex flex-col items-center justify-center">
						<h1 class="mt-4 text-xl font-bold text-blue-900">Name</h1>
						<p class="text-lg">{person.acf.firstname} {person.acf.lastname}</p>
					</div>
				</div>
				<div class="col-span-1">
					<div class="mt-4 flex flex-col items-center justify-center">
						<h1 class="text-xl font-bold text-blue-900">Status</h1>
						<p class="text-lg">{person.acf.function}</p>
					</div>
				</div>
			</div>
			<div class="mt-3 w-full px-4 text-left h-auto max-h-96 overflow-y-auto">
				<p class="mt-5 bg-slate-50">{@html person.content.rendered}</p>
			</div>
		</div>

		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Forschung" />
		<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-6">
			<div class="flex flex-row items-center justify-center">
				<div>
					<h1 class="text-center text-xl font-bold text-blue-900">Forschung</h1>
					<p class="text-lg">{person.acf.research}</p>
				</div>
			</div>
		</div>

		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Erreichbarkeit" />
		<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-10">
			<div class="grid grid-cols-3">
				<div class="flex flex-col items-center justify-center">
					<h1 class="text-xl font-bold text-blue-900">Institut</h1>
					<p class="text-lg">{person.acf.org}</p>
				</div>
				<div class="flex flex-col items-center justify-center">
					<h1 class="text-xl font-bold text-blue-900">Adresse</h1>
					<p class="text-lg">{person.acf.room}</p>
				</div>
				<div class="flex flex-col items-center justify-center">
					<h1 class="text-xl font-bold text-blue-900">E-Mail</h1>
					<p class="text-lg">{person.acf.email}</p>
				</div>
			</div>
		</div>
	</div>
</div>
