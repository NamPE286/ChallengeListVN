<script>
    import { onMount } from "svelte";
    import Level from "./List/Level.svelte";
    var level;
    function fetchData() {
        fetch(`${import.meta.env.VITE_API_URL}/dailyLevel`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((dat) => {
                level = dat;
            });
    }
    onMount(() => {
        fetchData();
    });
</script>

<div class="wrapper">
    <h3>Daily challenge</h3>
    {#if level}
        <Level data={level} mode="compact-fit" />
    {/if}
    {#if !level}
        <div class="text"><i>No level available</i></div>
    {/if}
    <div class="text">Reset every 07:00 UTC+7</div>
</div>

<style lang="scss">
    .wrapper {
        float: left;
        height: fit-content;
        width: 500px;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        box-sizing: border-box;
        padding-inline: 25px;
        padding-bottom: 25px;
        margin-right: 30px;
        margin-bottom: 30px;
    }
    .text {
        margin-top: 20px;
        color: rgb(167, 167, 167);
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            width: 100%;
            margin-right: 0;
        }
    }
</style>
