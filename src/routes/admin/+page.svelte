<script>
    import Title from '../../components/Title.svelte'
    import { user } from '../../stores'
</script>

{#if $user.isAdmin}
    <Title value='Admin'/>
{/if}