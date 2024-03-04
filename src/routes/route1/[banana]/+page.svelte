<script lang="ts">
    let {data} = $props();
    let postTitle = $state(data.postTitle);
</script>

<h1>{postTitle}</h1>

