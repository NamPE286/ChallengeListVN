<script>
    import { page } from "$app/stores";
    import Title from "../../../components/Title.svelte";
    import Badge from "../../../components/Player/Badge.svelte";
    import { onMount } from "svelte";
    import Loading from "../../../Loading.svelte";
    var level = null;
    const lengthConv = ["", "Tiny", "Short", "Medium", "Long", "XL"];
    var showMore = true;
    var loading = false

    var option = {
        range: {
            index: {
                start: 0,
                end: 9
            }
        }
    }

    async function fetchData() {
        const [dataRes, recordsRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/level/${$page.params.id}`),
            fetch(`${import.meta.env.VITE_API_URL}/level/${$page.params.id}/records/${encodeURIComponent(JSON.stringify(option))}`),
        ])

        level = {
            data: await dataRes.json(),
            records: await recordsRes.json()
        }

        if(level.records.length < 10) {
            showMore = false;
        }
    }

    async function showMoreRecord() {
        loading = true
        option.range.index.start += 10
        option.range.index.end += 10

        const data = await (await fetch(`${import.meta.env.VITE_API_URL}/level/${$page.params.id}/records/${encodeURIComponent(JSON.stringify(option))}`)).json()

        if(data.length < 10) {
            showMore = false;
        }

        level.records = level.records.concat(data)
        loading = false
    }

    function parseTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if(hrs == 0) {
            return mins + ':' + secs + '.' + ms;
        }

        return hrs + ':' + mins + ':' + secs + '.' + ms;
    }

    $: $page.params.id && fetchData();
    onMount(() => {
        fetchData();
    });
</script>

<svelte:head>
    <title
        >{level
            ? `${level.data.name} by ${level.data.players.name}`
            : "Level's info"} - Challenge List VN</title
    >
</svelte:head>
<Loading bind:disabled={level} />
{#if level}
    <Title value={`${level.data.name}`} />
    <main class="infoWrapper">
        <div class="info">
            <iframe
                src={`https://www.youtube.com/embed/${level.data.videoID}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            />
            <div class="detail">
                <section class="top">
                    <h2>
                        {level.data.rating}pt
                    </h2>
                </section>
                <p>
                    <b>Created by:</b><Badge player={level.data.players}
                        ><a href={`/player/${level.data.players.uid}`}
                            >{level.data.players.name}</a
                        ></Badge
                    >
                </p>
                <p>
                    <b>Submitted on: </b>{new Date(
                        level.data.timestamp
                    ).toLocaleString("vi-VN")}
                </p>
                <p><b>Length:</b> {level.data.length == -1 ? "Platformer" : lengthConv[level.data.length]}</p>
                <p><b>ID:</b> {level.data.id}</p>
                <p><b>Description: </b></p>
                {#if !level.data.description}
                    <p><i>(No description provided)</i></p>
                {/if}
                {#if level.data.description}
                    <p>{level.data.description}</p>
                {/if}
            </div>
        </div>
    </main>

    <main class="records">
        {#if !level.records.length}
            <p>No one has beaten this level</p>
        {/if}
        {#each level.records as item, index}
            <div class="record">
                {#if level.data.length == -1}
                    <div class='recordTime'>{parseTime(item.time)}</div>
                {/if}
                <Badge player={item.players}
                    ><a href={`/player/${item.players.uid}`}
                        >{item.players.name}</a
                    ></Badge
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
        {#if showMore}
            {#if loading}
                <Loading />
            {:else}
                <button
                    class="record clickable"
                    id="showMoreBtn"
                    on:click={() => {
                        showMoreRecord()
                    }}>Show more</button
                >
            {/if}
        {/if}
    </main>
{/if}

<style lang="scss">
    #showMoreBtn {
        color: white;
        display: flex;
        justify-content: center;
        background-color: black;
    }
    .recordTime {
        padding-right: 15px;
        font-weight: bold;
    }
    .infoWrapper {
        display: flex;
        justify-content: center;
    }
    .info {
        width: 1100px;
        height: fit-content;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        gap: 20px;
        p {
            margin-top: 7px;
            margin-bottom: 7px;
        }
        iframe {
            border-radius: 10px;
            min-width: 560px;
            height: 315px;
            border: 1px solid var(--line);
        }
        .top {
            height: 50px;
            width: fit-content;
            padding-inline: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            border: 1px solid var(--line);
        }
    }
    .records {
        display: flex;
        background-color: black;
        margin-top: 30px;
        border-top: 1px solid var(--line);
        box-sizing: border-box;
        padding-top: 30px;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        min-height: 50vh;
    }
    .record {
        height: 50px;
        width: 700px;
        border: 1px solid var(--line);
        border-radius: 10px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-inline: 20px;
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
    @media screen and (max-width: 1000px) {
        .info {
            width: 100%;
            flex-direction: column;
            iframe {
                min-width: 100%;
                height: 55vw;
            }
        }
        .record {
            width: 100%;
        }
    }
</style>
