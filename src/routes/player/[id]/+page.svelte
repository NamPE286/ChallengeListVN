<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Loading from "../../../Loading.svelte";
    import Level from "../../../components/List/Level.svelte";
    import Badge from "../../../components/Player/Badge.svelte";
    import { toast } from "../../../toast";
    var player = null;
    var showAllRecords = false;
    function fetchData() {
        player = null;
        fetch(`${import.meta.env.VITE_API_URL}/player/${$page.params.id}`).then(
            (res) =>
                res.json().then((data) => {
                    player = data;
                })
        );
    }

    function getWeight(rank) {
        return Math.ceil(((15 - rank + 1) * 100) / 15);
    }

    $: $page.params.id && fetchData();
    onMount(() => {
        fetchData();
    });
</script>

<Loading bind:disabled={player} />

<svelte:head>
    <title
        >{player ? player.data.name : "Player"}'s profile - Challenge List VN</title
    >
</svelte:head>

{#if player}
    <div class="header">
        <img
            class="avatar"
            src={`https://lh3.googleusercontent.com/a/${player.data.googleAvatarID}=s240-c`}
            alt=""
        />
        <div class="playerInfo">
            <Badge player={player.data} size={16}>
                <h1>{player.data.name}</h1>
            </Badge>
            <span id="rating"
                >Rating: {player.data.rating} (#{player.data.rank})</span
            >
            <section>
                {#if player.data.youtube}
                    <a href={player.data.youtube} target="_blank">
                        <img id="social" src="/youtube.svg" alt="" />
                    </a>
                {/if}
                {#if player.data.facebook}
                    <a href={player.data.facebook} target="_blank">
                        <img id="social" src="/facebook.svg" alt="" />
                    </a>
                {/if}
                {#if player.data.discord}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span
                        class="clickable"
                        on:click={() => {
                            navigator.clipboard.writeText(player.data.discord);
                            toast("Copied Discord username to clipboard!");
                        }}
                    >
                        <img id="social" src="/discord.svg" alt="" />
                    </span>
                {/if}
            </section>
        </div>
    </div>
    <main>
        <div class="records">
            <h3>Best play</h3>
            {#if !player.records.length}
                <p>This player hasn't beaten any level</p>
            {/if}
            {#each player.records.slice(0, 5) as item, index}
                <div class="record">
                    <div class="pt">
                        <div>{item.levels.rating}pt</div>
                        {#if getWeight(index + 1) > 0}
                            <div id="weight">
                                Weighted {getWeight(index + 1)}%
                            </div>
                        {/if}
                    </div>
                    <a href={`/level/${item.levels.id}`}
                        ><b>{item.levels.name} </b><br />by {item.levels.players
                            .name}</a
                    >
                    <div class="recordDetail">{item.refreshRate}hz</div>
                    {#if item.isMobile}
                        <div class="recordDetail">Mobile</div>
                    {/if}
                    <section>
                        <a href={item.videoLink} target="_blank">
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
            {#if !showAllRecords && player.records.length > 5}
                <button
                    class="record clickable"
                    id="showMoreBtn"
                    on:click={() => {
                        showAllRecords = true;
                    }}>Show more</button
                >
            {/if}
            {#if showAllRecords}
                {#each player.records.slice(5, player.records.length) as item, index}
                    <div class="record">
                        <div class="pt">
                            <div>{item.levels.rating}pt</div>
                            {#if getWeight(index + 6) > 0}
                                <div id="weight">
                                    Weighted {getWeight(index + 6)}%
                                </div>
                            {/if}
                        </div>
                        <a href={`/level/${item.levels.id}`}
                            ><b>{item.levels.name} </b><br />by {item.levels
                                .players.name}</a
                        >
                        <div class="recordDetail">{item.refreshRate}hz</div>
                        {#if item.isMobile}
                            <div class="recordDetail">Mobile</div>
                        {/if}
                        <section>
                            <a href={item.videoLink} target="_blank">
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
            {/if}
        </div>
        <div class="levelsWrapper">
            <div class="levels">
                <h3>Levels</h3>
                {#if !player.levels.length}
                    <p>This player hasn't created any level</p>
                {/if}
                {#each player.levels as item, index}
                    <Level data={item} mode="compact" />
                {/each}
            </div>
        </div>
    </main>
{/if}

<style lang="scss">
    #showMoreBtn {
        color: white;
        display: flex;
        justify-content: center;
    }
    #rating {
        margin-bottom: 21px;
        margin-top: -12px;
    }
    h3 {
        line-height: 25px;
        margin-right: auto;
    }
    main {
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
        width: fit-content;
        padding-inline: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border-right: 1px solid var(--line);
        height: 100%;
        font-weight: bold;

        #weight {
            font-weight: 100;
            font-size: 12px;
        }
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
        .levels {
            padding-inline: 30px;
        }
        .records {
            padding-inline: 30px;
        }
        .record {
            width: 100%;
        }
        br {
            display: block;
        }
    }
</style>
