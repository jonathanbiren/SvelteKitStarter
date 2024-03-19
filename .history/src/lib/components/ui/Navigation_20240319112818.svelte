<script lang="ts">
	import { goto } from "$app/navigation";

	let { authStatus } = $props();


	function navigateTo(route: string): void {
		if(authStatus) {
			goto(route); 
		} else {
			console.log('You are not logged in');
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

<button class="btn" ">open modal</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>