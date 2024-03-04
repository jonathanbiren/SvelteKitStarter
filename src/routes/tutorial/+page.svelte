<script lang="ts">
	let {data} = $props();
	let posts = $state(data.posts);
</script>

<div class="flex flex-col gap-10">

{#each posts as post (post.title)}
	<div>
		<a href="tutorial/{post.slug}">
			<h2 class="text-blue-600 font-bold text-3xl">{post.title}</h2>
		</a>
		<p>{post.excerpt}</p>
	</div>
{/each}
</div>