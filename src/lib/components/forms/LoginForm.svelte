<script lang="ts">
	//In Svelte 5, accessing the data that is returned by the form action seems to only be possible
	// by using the page store. Be sure to check back for the official documentation of the svelte 5 release.
	import { page } from '$app/stores';
	//accesses the page store, whose form property will contain data once 
	//a form has been submitted for the first time
	let form = $state($page.form);

	//This effect will focus the password input field if the form has been submitted with incorrect
	//credentials
	$effect(() => {
		if (form?.incorrect) {
			let passwordInputField: HTMLInputElement = document.getElementById(
				'password'
			) as HTMLInputElement;
			passwordInputField.focus();
		}
	});
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-sm">
	<img class="mx-auto h-16 w-auto" src="/logos/portal_logo.png" alt="Uni-Logo" />
	<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
		Sign into your account
	</h2>
</div>

<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
	<form class="space-y-6" method="POST" action="?/login">
		{#if form?.incorrect}<p class="text-red-700">Wrong credentials. Please try again</p>{/if}

		<div>
			<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
				>Email address</label
			>
			<div class="mt-2">
				<input
					id="email"
					name="email"
					type="text"
					autocomplete="email"
					required
					value={form?.email ?? ''}
					class="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
					>Password</label
				>
			</div>
			<div class="mt-2">
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
					class="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="flex w-full justify-center rounded-md bg-[#E4803A] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Sign in</button
			>
		</div>
	</form>
</div>
