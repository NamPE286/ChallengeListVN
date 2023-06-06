<script>
    import { user } from "../stores";
    import { onMount } from "svelte";
    var data = {
        levels: [],
        records: [],
    };
    $: $user && fetchData();
    function fetchData() {
        if (!$user) {
            return;
        }
        fetch(`${import.meta.env.VITE_API_URL}/auth/pendingSubmission`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((dat) => {
                data = dat;
            });
    }
    onMount(() => {
        fetchData();
    });
</script>

<div class="wrapper">
    <h3>Pending Submission</h3>
    <h4>Levels</h4>
    {#each data.levels as item, index}
        <a href="#!">{item.name} by {item.players.name}</a><br />
    {/each}
    <h4>Records</h4>
    {#each data.records as item, index}
        <a href="#!">{item.levels.name} by {item.levels.players.name}</a><br />
    {/each}
</div>

<style lang="scss">
    h4{
        margin-bottom: 10px;
    }
    .wrapper {
        height: fit-content;
        width: 500px;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        box-sizing: border-box;
        padding-inline: 25px;
        padding-bottom: 25px;
    }
    a {
        line-height: 20px;
        color: rgb(192, 192, 192);
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            width: 100%;
        }
    }
</style>
