<script lang="ts">
    import type { Person } from '$lib/types/Person';
    import UserCardBig from '$lib/components/ui/UserCardBig.svelte'; 


    let {data} = $props(); 
    let person: Person = $state(data.person);
    let imgURL: string = $state(data.imgURL); 
</script>

{#if person}
    <UserCardBig {person} {imgURL}/>
{/if}

