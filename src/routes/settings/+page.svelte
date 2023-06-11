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
        <div class='sectionWrapper'>
            <h2>Basic info</h2>

        </div>
        <button class="redBtn clickable" on:click={signOut}>Sign Out</button>
    {/if}
</main>

<style lang="scss">
    .sectionWrapper{
        border: 1px var(--line) solid;
        border-radius: 10px;
    }
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
