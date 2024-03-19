<script lang="ts">
	import { goto } from '$app/navigation';

	let { authStatus } = $props();

	function navigateTo(route: string): void {
		if (authStatus) {
			goto(route);
		} else {
			const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
			modal.showModal();
		}
	}
</script>

<div class="navbar bg-gray-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">HOME</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a class="font-bold" href="/login">Login</a></li>
			<li><button class="font-bold" onclick={() => navigateTo('/profiles')}>Profiles</button></li>
			<li><button class="font-bold" onclick={() => navigateTo('/search')}>Search</button></li>
		</ul>
	</div>
</div>

<!-- This is the modal and it will not show until the .showModal() method is called -->
<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
	</div>
</dialog>
