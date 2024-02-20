<script>
    import Title from "../../components/Title.svelte";
    import Badge from "../../components/Player/Badge.svelte";
    import { onMount } from "svelte";
    import Loading from "../../Loading.svelte";
    var playersData = [];
    var loaded = false
    var option = {
        range: {
            index: {
                start: 0,
                end: 19
            },
            rating: {
                start: 0,
                end: 100000
            }
        }
    }
    function fetchData() {
        loaded = false;

        fetch(`${import.meta.env.VITE_API_URL}/leaderboard/${encodeURIComponent(JSON.stringify(option))}`).then((res) =>
            res.json().then((data) => {
                playersData = playersData.concat(data)  ;
                loaded = true
            })
        );
    }

    onMount(() => {
        fetchData();

        window.onscroll = function (ev) {
            if (
                window.innerHeight + window.pageYOffset >=
                    document.body.offsetHeight - 1200 &&
                loaded
            ) {
                option.range.index.start += 20
                option.range.index.end += 20
                fetchData();
                console.log(option.range)
            }
        };
    });
</script>

<Title value="Leaderboard" />
<Loading bind:disabled={playersData.length} />
<main>
    {#each playersData as item, index}
        <div class="player">
            <h3 id="top">#{item.rank}</h3>
            <img
                class="avatar"
                src={`https://lh3.googleusercontent.com/a/${item.googleAvatarID}=s240-c`}
                alt=""
            />
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

        img {
            height: 30px;
            margin-inline: 8px;
            border-radius: 50%;
        }
    }

    #rating {
        margin-left: auto;
    }

    @media screen and (max-width: 1000px) {
        .player {
            width: 100%;
        }
    }
</style>
