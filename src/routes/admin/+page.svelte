<script>
    import Title from '../../components/Title.svelte'
    import { user } from '../../stores'
</script>

{#if $user && $user.isAdmin}
    <Title value='Admin'/>
    <main>
        <a href='#!'>Level editor</a><br>
        <a href='#!'>Record editor</a><br>
        <a href='#!'>Notification sender</a><br>
        <span>Submit checker:</span>
        <a href='#!'>Levels</a>
        <a href='#!'>Records</a>
    </main>
{/if}
<style lang="scss">
    a{
        text-decoration: underline;
        color: rgb(0, 153, 255);
    }
</style>