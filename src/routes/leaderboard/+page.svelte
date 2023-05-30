<script>
    import Title from "../../components/Title.svelte";
    import PlayerLink from "../../components/Player/PlayerLink.svelte";
</script>

<Title value="Leaderboard" />

<main>
    {#each Array(20) as item, index}
        <div class="player">
            <h3 id="top">#{index + 1}</h3>
            <PlayerLink size={10} player={{ uid: "abcxyz" }}
                >Rophisus</PlayerLink
            >
            <h3 id="rating">1000rt</h3>
        </div>
    {/each}
</main>

<style lang="scss">
    main {
        padding-inline: 80px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .player {
        display: flex;
        align-items: center;
        width: 700px;
        height: 45px;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 7px;
        padding-inline: 15px;
    }
    #rating {
        margin-left: auto;
    }
    #top {
        margin-right: 7px;
    }
</style>
