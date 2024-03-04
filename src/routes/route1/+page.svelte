<script lang="ts">
	let { data } = $props();
	let posts = $state(data.posts);
</script>

<div class="grid h-full w-full grid-cols-2 bg-blue-600">
	<form class="p-4">
		<input type="email" name="email" placeholder="E-Mail" />
	</form>

	{#if posts}
		{#each posts as post (post.id)}
			<a href="/route1/{post.title}">
				<p>{post.title}</p>
			</a>

		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</div>
