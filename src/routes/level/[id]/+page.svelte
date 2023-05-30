<script>
    import { page } from "$app/stores";
    import Title from "../../../components/Title.svelte";
    import PlayerLink from "../../../components/Player/PlayerLink.svelte";
    console.log($page.params.id);
</script>

<svelte:head>
    <title>Level's name - Challenge List VN</title>
</svelte:head>

<Title value="Level's name" />

<main class="infoWrapper">
    <div class="info">
        <iframe
            src="https://www.youtube.com/embed/uIws4vESLNQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        />
        <div class="detail">
            <section class="top">
                <h2>#1</h2>
                <section class="pt">100pt</section>
            </section>
            <p><b>Description</b></p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse et magna ut lectus scelerisque tincidunt. Etiam
                semper pharetra varius. Sed congue diam id velit sagittis,
                mollis tempor dolor ultrices. Maecenas venenatis metus non arcu
                convallis, in pellentesque lacus molestie. Fusce nec risus
                ipsum. Ut volutpat, metus in luctus maximus, arcu dolor accumsan
                mauris, eget venenatis mauris neque sed lorem. Integer pharetra
                nunc ante, non pellentesque massa tincidunt at. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Ut id varius sem.
            </p>
        </div>
    </div>
</main>

<main class="records">
    {#each Array(10) as item, index}
        <div class="record">
            <PlayerLink player={{ uid: "abcxyz" }}>Rophisus</PlayerLink>
            <div class="recordDetail">100%</div>
            <div class="recordDetail">60hz</div>
            <div class="recordDetail">Mobile</div>
            <section>
                <a href="#!">
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
                        /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></svg
                    >
                </a>
            </section>
        </div>
    {/each}
</main>

<style lang="scss">
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
        .pt {
            margin-left: 10px;
            padding: 5px;
            border-radius: 10px;
            background-color: white;
            color: black;
            font-weight: bold;
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
</style>
