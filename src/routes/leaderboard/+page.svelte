<script>
    import Title from "../../components/Title.svelte";
    import Badge from "../../components/Player/Badge.svelte";
    import { onMount } from "svelte";
    import Loading from "../../Loading.svelte";
    var playersData = [];
    function fetchData() {
        fetch(`${import.meta.env.VITE_API_URL}/leaderboard`).then((res) =>
            res.json().then((data) => {
                playersData = data;
            })
        );
    }
    onMount(() => {
        fetchData();
    });
</script>

<Title value="Leaderboard" />
<Loading bind:disabled={playersData.length} />
<main>
    {#each playersData as item, index}
        <div class="player">
            <h3 id="top">#{item.rank}</h3>
            <Badge size={10} player={item}
                ><a href={`/player/${item.uid}`}>{item.name}</a></Badge
            >
            <h3 id="rating">{item.rating}rt</h3>
        </div>
    {/each}
</main>

<style lang="scss">
    main {
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
        box-sizing: border-box;
    }
    #rating {
        margin-left: auto;
    }
    #top {
        margin-right: 7px;
    }
    @media screen and (max-width: 1000px) {
        .player {
            width: 100%;
        }
    }
</style>
