<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Loading from "../../../Loading.svelte";
    import Level from "../../../components/List/Level.svelte";

    var player = null;
    function fetchData() {
        player = null;
        fetch(`${import.meta.env.VITE_API_URL}/player/${$page.params.id}`).then(
            (res) =>
                res.json().then((data) => {
                    player = data;
                })
        );
    }
    $: $page.params.id && fetchData();
    onMount(() => {
        fetchData();
    });
</script>

<Loading bind:disabled={player} />

{#if player}
    <div class="header">
        <img
            class="avatar"
            src={`https://lh3.googleusercontent.com/a/${player.data.googleAvatarID}=s240-c`}
            alt=""
        />
        <div class="playerInfo">
            <h1>{player.data.name}</h1>
            <span id="rating"
                >Rating: {player.data.rating} (#{player.data.rank})</span
            >
            <section>
                {#if player.data.youtube}
                    <a href={player.data.youtube}>
                        <img id="social" src="/youtube.svg" alt="" />
                    </a>
                {/if}
                {#if player.data.facebook}
                    <a href={player.data.facebook}>
                        <img id="social" src="/facebook.svg" alt="" />
                    </a>
                {/if}
                {#if player.data.discord}
                    <a href={player.data.discord}>
                        <img id="social" src="/discord.svg" alt="" />
                    </a>
                {/if}
            </section>
        </div>
    </div>
    <main>
        <div class="records">
            <h3>Records</h3>
            {#each player.records as item, index}
                <div class="record">
                    <div class="pt">{item.levels.rating}pt</div>
                    <a href={`/level/${item.levels.id}`}
                        ><b>{item.levels.name} </b><br />by {item.levels.players
                            .name}</a
                    >
                    <div class="recordDetail">{item.refreshRate}hz</div>
                    {#if item.isMobile}
                        <div class="recordDetail">Mobile</div>
                    {/if}
                    <section>
                        <a href={item.videoLink}>
                            <svg
                                data-testid="geist-icon"
                                fill="none"
                                height="24"
                                shape-rendering="geometricPrecision"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                                style="color:var(--geist-foreground)"
                                ><path
                                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                                /><path d="M15 3h6v6" /><path
                                    d="M10 14L21 3"
                                /></svg
                            >
                        </a>
                    </section>
                </div>
            {/each}
        </div>
        <div class="levelsWrapper">
            <div class="levels">
                <h3>Levels</h3>
                {#each player.levels as item, index}
                    <Level data={item} mode='compact'/>
                {/each}
            </div>
        </div>
    </main>
{/if}

<style lang="scss">
    #rating {
        margin-bottom: 21px;
        margin-top: -12px;
    }
    h3 {
        border-bottom: rgb(172, 172, 172) 2px solid;
        line-height: 25px;
        margin-right: auto;
    }
    main{
        padding: 0;
    }
    .records {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        box-sizing: border-box;
        padding-inline: 100px;
    }
    .levels {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        background-color: black;
        border-top: var(--line) 1px solid;
        padding-inline: 100px;
        min-height: 700px;
        margin-top: 50px;
        padding-top: 10px;
    }
    .header {
        width: 100%;
        box-sizing: border-box;
        padding: 30px;
        height: fit-content;
        background-color: black;
        border-bottom: 1px solid var(--line);
        display: flex;
        align-items: center;
        padding-inline: 100px;
        margin-bottom: 10px;
        .avatar {
            height: 200px;
            width: 200px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
    .playerInfo {
        display: flex;
        flex-direction: column;
        #social {
            height: 21px;
            object-fit: cover;
        }
        section {
            display: flex;
            align-items: center;
            gap: 20px;
        }
    }
    section {
        overflow: visible;
        display: flex;
        align-items: center;
        z-index: 2;
        a {
            color: gray;
        }
        a:hover {
            text-decoration: underline;
        }
    }
    .record {
        background-color: black;
        height: 50px;
        width: 800px;
        border: 1px solid var(--line);
        border-radius: 10px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-right: 20px;
        svg {
            scale: 0.7;
        }
        section {
            margin-left: auto;
        }
    }
    .recordDetail {
        background-color: white;
        color: black;
        border-radius: 5px;
        padding: 3px;
        padding-inline: 4px;
        font-weight: bold;
        font-size: 12px;
        margin-left: 6px;
    }
    .pt {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border-right: 1px solid var(--line);
        height: 100%;
        font-weight: bold;
    }
    br {
        display: none;
    }
    @media screen and (max-width: 1000px) {
        .header {
            padding-inline: 30px;
            .avatar {
                height: 120px;
                width: 120px;
                margin-right: 20px;
            }
        }
        .record {
            width: 100%;
        }
        br {
            display: block;
        }
    }
</style>
