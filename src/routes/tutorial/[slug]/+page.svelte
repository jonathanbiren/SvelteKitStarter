<script lang="ts">
	let { data } = $props();
	let post = $state(data.post);
</script>

{#if post}
	<div class="max-w-xl">
		<h1 class="text-3xl font-bold text-blue-600 mb-2">{post.title}</h1>
		<p>
			{post.content}
		</p>
	</div>
{:else}
	<p>Post not found</p>
{/if}
