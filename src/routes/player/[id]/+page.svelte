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
        return Math.max(0, Math.ceil(-Math.pow((rank - 42.21) / 10, 3) + 30));
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
        {#if player.data.bannerImage}
            <img class='banner' src={player.data.bannerImage} alt=''>
        {/if}
        <div class='infoWrapper'>
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
    </div>
    <main>
        <div class='recentActivities'>
            <h3>Recent activities</h3>

            {#if !player.recentActivities.length}
                <p>No activity</p>
            {:else}
                {#each player.recentActivities as item, index}
                    {#if item.type == 'level'}
                        <Level data={item.data} mode="compact" />
                    {/if}
                    {#if item.type == 'record'}
                        <div class="record">
                            <div class="pt">
                                <div>{item.data.levels.rating}pt</div>
                                {#if getWeight(index + 1) > 0}
                                    <div id="weight">
                                        {item.data.rating * getWeight(item.data.no) / 100}pt ({getWeight(item.data.no)}%)
                                    </div>
                                {/if}
                            </div>
                            <a href={`/level/${item.data.levels.id}`}
                                ><b>{item.data.levels.name} </b><br />by {item.data.levels.players
                                    .name}</a
                            >
                            <div class="recordDetail">{item.data.refreshRate}hz</div>
                            {#if item.data.isMobile}
                                <div class="recordDetail">Mobile</div>
                            {/if}
                            <section>
                                <a href={item.data.videoLink} target="_blank">
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
                    {/if}
                {/each}
            {/if}


        </div>
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
                                {item.rating * getWeight(item.no) / 100}pt ({getWeight(item.no)}%)
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
                                    {item.rating * getWeight(item.no) / 100}pt ({getWeight(item.no)}%)
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
    .banner {
        position: absolute;
        width: 100%;
        margin: 0 auto;
        opacity: 50%;
    }

    .infoWrapper {
        display: flex;
        align-items: center;
        padding-left: 100px;
        padding-top: 30px;
        padding-bottom: 30px;
        z-index: 3;
    }
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

    .recentActivities {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        box-sizing: border-box;
        padding-inline: 100px;
        background-color: black;
        border-bottom: 1px solid var(--line);
        padding-top: 10px;
        padding-bottom: 50px;
    }

    .records {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        box-sizing: border-box;
        padding-inline: 100px;
        margin-top: 10px;
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
        padding-bottom: 50px;
    }
    .header {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        height: fit-content;
        background-color: black;
        border-bottom: 1px solid var(--line);
        display: flex;
        align-items: center;
        overflow: hidden;
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
        .infoWrapper {
            padding-left: 30px;
        }
        .header {
            .avatar {
                height: 120px;
                width: 120px;
                margin-right: 20px;
            }
        }
        .recentActivities {
            padding-inline: 30px;
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
