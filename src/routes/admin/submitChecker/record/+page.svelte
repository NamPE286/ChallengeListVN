<script>
    import Title from "../../../../components/Title.svelte";
    import Level from "../../../../components/List/Level.svelte";
    import { user } from "../../../../stores";
    import { onMount } from "svelte";
    var data = [];
    function fetchData() {
        fetch(`${import.meta.env.VITE_API_URL}/admin/submissions/record`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((dat) => {
                data = dat;
                console.log(dat)
            });
    }
    function accept(item, index) {
        item.accepted = true;
        delete item.players
        delete item.levels
        fetch(`${import.meta.env.VITE_API_URL}/record`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.ok) {
                data.splice(index, 1)
                data = data
            }
        });
    }
    function reject(item, index) {
        fetch(`${import.meta.env.VITE_API_URL}/record`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.ok) {
                data.splice(index, 1)
                data = data
            }
        });
    }
    onMount(() => {
        fetchData();
    });
</script>

<Title value="Submit checker: Record" />
<main>
    {#each data as item, index}
        <span><a href={`/level/${item.levelID}`}>{item.levels.name} by {item.levels.players.name}</a> - {item.levelID} (<a href={item.videoLink}>{item.videoLink}</a>)</span>
        <button on:click={() => accept(item, index)}>Accept</button>
        <button on:click={() => reject(item, index)}>Reject</button>
        <br>
    {/each}
</main>
