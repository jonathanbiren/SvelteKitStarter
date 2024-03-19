<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	let { data } = $props();
	let authStatus: boolean = $state(data.isAuthenicated);
</script>

{#if !authStatus}
	<LoginForm {authStatus} />
{:else}

		<form method="POST" action="/logout">
			<button
				type="submit"
				class="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Log out</button
			>
		</form>

{/if}

