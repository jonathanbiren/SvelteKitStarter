<script lang="ts">
    import type { Person } from '$lib/types/Person';
    import UserCardBig from '$lib/components/ui/UserCardBig.svelte'; 
    let {data} = $props();
    let person: Person = $state(data.person);
    let imgURL: string = $state(data.imgURL); 
</script>

{#if person}
    <h1 class="text-3xl font-bold mb-5">Welcome!</h1>
    <UserCardBig {person} {imgURL}/>
    <a href="/edit" class="btn btn-secondary font-bold mt-5">Update Profile</a>
{/if}

