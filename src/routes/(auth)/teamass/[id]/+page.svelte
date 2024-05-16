<script lang="ts">
	import type { Person } from '$lib/types/Person';
	import UpdatePage from '$lib/components/ui/UpdatePage.svelte';
	import { DEFAULT_IMG_URL } from '$lib/utils/WordPressCMS';

	let { data }: { person: Person, imgURL: string } = $props();

	let person: Person | null | undefined = $state(data.person);
	let imgURL: string | undefined = $state(data.imgURL);
</script>

{#if person }
	<UpdatePage person={person} imgURL={imgURL ||  DEFAULT_IMG_URL} />
{/if}