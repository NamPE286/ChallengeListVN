<script>
    import Title from "../../components/Title.svelte";
    import Level from "../../components/List/Level.svelte";
    import Loading from "../../Loading.svelte";
    import { onMount } from "svelte";
    var loaded = false;
    var isInit = false
    var levelsData = [];
    const defaultOption = {
        range: {
            index: {
                start: 0,
                end: 30,
            },
            rating: {
                start: 0,
                end: 10000,
            },
        },
        filter: {
            ascending: false,
            sortBy: "timestamp",
            length: 0
        },
    };
    var option = {
        range: {
            index: {
                start: 0,
                end: 30,
            },
            rating: {
                start: 0,
                end: 10000,
            },
        },
        filter: {
            ascending: false,
            sortBy: "timestamp",
            length: 0
        },
    };
    function fetchData() {
        option.range.index = {
            start: 0,
            end: 30,
        };
        fetch(
            `${import.meta.env.VITE_API_URL}/list/${encodeURIComponent(
                JSON.stringify(option)
            )}`
        ).then((res) =>
            res.json().then((data) => {
                levelsData = data;
                loaded = true;
                isInit = true;
            })
        );
    }
    function fetchDataLazy() {
        loaded = false;
        option.range.index.start += 31;
        option.range.index.end += 31;
        fetch(
            `${import.meta.env.VITE_API_URL}/list/${encodeURIComponent(
                JSON.stringify(option)
            )}`
        ).then((res) =>
            res.json().then((data) => {
                levelsData = levelsData.concat(data);
                loaded = true;
            })
        );
    }
    function reset() {
        option = defaultOption;
    }
    onMount(() => {
        fetchData();
        window.onscroll = function (ev) {
            if (
                window.innerHeight + window.pageYOffset >=
                    document.body.offsetHeight - 1200 &&
                loaded
            ) {
                fetchDataLazy();
            }
        };
    });
</script>

<Title value="Level listing" />
<Loading bind:disabled={isInit} />

{#if isInit}
    <main>
        <div class="levels">
            {#each levelsData as item, index}
                <Level data={item} />
            {/each}
        </div>

        {#if !levelsData.length} 
            <div class="levels noneText">
                No level available
            </div>
        {/if}
        <div class="filter">
            <h3>Filter</h3>
            <div class="filterOpt">
                <span>Rating range: </span>
                <input
                    placeholder="0"
                    bind:value={option.range.rating.start}
                    type="number"
                />
                -
                <input
                    placeholder="10000"
                    bind:value={option.range.rating.end}
                    type="number"
                />
            </div>
            <div class="filterOpt">
                <span>Sort by: </span>
                <select name="sortBy" bind:value={option.filter.sortBy}>
                    <option value="rating">Rating</option>
                    <option value="timestamp">Date submitted</option>
                </select>
            </div>
            <div class="filterOptCheck">
                <input type="checkbox" bind:checked={option.filter.ascending} />
                <span>Sort ascending</span>
            </div>
            <div class="filterOpt">
                <span>Length: </span>
                <select name="sortBy" bind:value={option.filter.length}>
                    <option value={0}>All</option>
                    <option value={1}>Tiny</option>
                    <option value={2}>Short</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Long</option>
                    <option value={5}>XL</option>
                    <option value={-1}>Platformer</option>
                </select>
            </div>
            <div class="left">
                <button id="blackBtn" on:click={reset}>Reset</button>
                <button id="whiteBtn" on:click={fetchData}>Apply</button>
            </div>
        </div>
    </main>
{/if}

<style lang="scss">
    .noneText {
        width: 780px;
        text-align: center;
    }

    main {
        display: flex;
        gap: 20px;
    }
    .levels {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .filter {
        width: 350px;
        height: fit-content;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 20px;
        h3 {
            margin: 0;
            margin-bottom: 10px;
        }
    }
    .filterOpt {
        margin-bottom: 5px;
        input {
            background-color: black;
            border: 1px solid var(--line);
            width: 50px;
            height: 20px;
            border-radius: 5px;
            color: white;
        }
        select {
            background-color: black;
            border: 1px solid var(--line);
            height: 20px;
            border-radius: 5px;
            color: white;
        }
    }
    .filterOptCheck {
        input[type="checkbox"] {
            filter: invert(1);
            accent-color: black;
        }
    }
    .left {
        display: flex;
        margin-top: 10px;
        justify-content: end;
        gap: 7px;
        #whiteBtn {
            background-color: white;
            border: 1px solid white;
            height: 30px;
            padding-inline: 10px;
            border-radius: 4px;
            transition: all 0.3s;
            cursor: pointer;
        }
        #whiteBtn:hover {
            background-color: black;
            color: white;
        }
        #blackBtn {
            background-color: black;
            color: rgb(141, 141, 141);
            border: 1px solid var(--line);
            height: 30px;
            padding-inline: 10px;
            border-radius: 4px;
            transition: all 0.3s;
            cursor: pointer;
        }
        #blackBtn:hover {
            border: 1px solid white;
            color: white;
        }
    }
    @media screen and (max-width: 1000px) {
        main {
            flex-direction: column-reverse;
        }
        .filter {
            width: 100%;
        }
    }
</style>
