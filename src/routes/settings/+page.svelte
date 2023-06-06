<script>
    import Title from "../../components/Title.svelte";
    import { user } from '../../stores'
    import { supabase } from "../../db";
    async function signOut() {
        await supabase.auth.signOut()
    }
</script>

<Title value="Settings" />
<main>
    {#if $user}
        <h2>Profile</h2>
        <button class="redBtn clickable" on:click={signOut}>Sign Out</button>
    {/if}
</main>

<style lang="scss">
    .redBtn {
        border: none;
        background-color: #5b0000;
        padding: 8px;
        padding-inline: 15px;
        color: #ff0000;
        border-radius: 10px;
        transition: background-color 0.2s;
    }
    .redBtn:hover {
        background-color: rgb(128, 0, 0);
    }
</style>
