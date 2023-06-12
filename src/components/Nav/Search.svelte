<script>
    export var enabled = false;
    import { fly } from "svelte/transition";
    import Loading from "../../Loading.svelte";
    import Badge from "../Player/Badge.svelte";
    var value = "";
    var result = null;
    var pending = null;
    function fetchData() {
        result = null;
        fetch(`${import.meta.env.VITE_API_URL}/search/${value}`).then((res) =>
            res.json().then((data) => {
                result = data;
            })
        );
    }
    function typingAction() {
        clearTimeout(pending);
        pending = setTimeout(fetchData, 800);
    }
    function onKeyDown(e) {
        if(e.key == 'Escape') enabled = false
    }
</script>

<svelte:window on:keydown={onKeyDown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="backdrop"
    on:click={() => {
        enabled = false;
    }}
/>
<div class="wrapper" transition:fly={{ y: -20, duration: 300 }}>
    <!-- svelte-ignore a11y-autofocus -->
    <input
        placeholder="Type to search"
        bind:value
        on:input={typingAction}
        autofocus
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        on:click={() => {
            enabled = false;
        }}
    >
        {#if value}
            {#if !result}
                <div class="result">
                    <Loading />
                </div>
            {/if}
            {#if result}
                <div class="result">
                    <h4>Level result</h4>
                    {#each result.levels as item, index}
                        <a href={`/level/${item.id}`}>
                            <section>
                                {item.name} by {item.players.name} - {item.id}
                            </section>
                        </a>
                    {/each}
                </div>
                <div class="result">
                    <h4>Player result</h4>

                    {#each result.players as item, index}
                        <a href={`/player/${item.uid}`}>
                            <section>
                                <img
                                    src={`https://lh3.googleusercontent.com/a/${item.googleAvatarID}=s32-c`}
                                    alt=""
                                />
                                <Badge player={item}>
                                    {item.name}
                                </Badge>
                            </section>
                        </a>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
    .backdrop {
        position: fixed;
        margin-top: -135px;
        height: 200%;
        width: 200%;
        z-index: 11;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .wrapper {
        position: fixed;
        margin-top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        z-index: 12;
    }
    input {
        background-color: black;
        border: 1px solid var(--line);
        height: 55px;
        width: 100%;
        border-radius: 10px;
        font-size: 16px;
        box-sizing: border-box;
        padding-inline: 25px;
        color: white;
    }
    .result {
        background-color: black;
        border: 1px solid var(--line);
        height: fit-content;
        margin-top: 15px;
        border-radius: 10px;
        padding: 20px;
        h4 {
            margin: 0;
            padding-bottom: 10px;
        }
        section {
            margin-top: 10px;
            display: flex;
            align-items: center;
            img {
                border-radius: 50%;
                height: 25px;
                margin-right: 10px;
            }
            a {
                width: 100%;
            }
            transition: all 0.2s;
        }
        section:hover {
            color: white;
        }
        a {
            color: rgb(161, 161, 161);
        }
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            width: 90%;
        }
    }
</style>
