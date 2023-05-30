<script>
    import { page } from '$app/stores';
    import Title from '../../../components/Title.svelte';
    console.log($page.params.id)
</script>

<Title value="Level's name"/>
