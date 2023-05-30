<script>
    import { page } from '$app/stores';
    import Title from '../../../components/Title.svelte';
    console.log($page.params.id)
</script>

<svelte:head>
    <title>Level's name - Challenge List VN</title>
</svelte:head>

<Title value="Level's name"/>
