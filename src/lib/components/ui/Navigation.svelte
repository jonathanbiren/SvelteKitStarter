<script lang="ts">
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	let { authStatus } = $props();

	const commonName = Cookies.get('commonName') ?? '';

	function navigateTo(route: string): void {
		if (authStatus) {
			goto(route);
		} else {
			const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
			modal.showModal();
		}
	}

</script>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<div class="navbar bg-gray-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">HOME</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if authStatus}
				{#if commonName}
					<li><a class="font-bold" href="/{commonName}"><span class="material-icons">person</span></a></li>
				{:else}
					<li><a class="font-bold" href="/search"><span class="material-icons">search</span></a></li>
				{/if}
				<li>
					<form method="POST" action="/logout">
						<button type="submit" class="font-bold">Logout</button>
					</form>
				</li>
			{/if}
			<li><a class="font-bold" href="/login">Login</a></li>
			<li>
				<a class="font-bold" href="/profiles">Profiles</a>
				<!--
								<button class="font-bold" onclick={() => navigateTo('/profiles')}>Profiles</button>
				-->
			</li>
			<li>
				<!--
								<button class="font-bold" onclick={() => navigateTo('/search')}>Search</button>
				-->
				<a class="font-bold" href="/search">Search</a>
			</li>
		</ul>
	</div>
</div>

<!-- This is the modal and it will not show until the .showModal() method is called -->
<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">You must be logged in to access this route</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>