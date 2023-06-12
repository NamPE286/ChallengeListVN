<script>
    import Title from "../../../../components/Title.svelte";
    import Level from "../../../../components/List/Level.svelte";
    import { user } from "../../../../stores";
    import { onMount } from "svelte";
    var data = [];
    function fetchData() {
        fetch(`${import.meta.env.VITE_API_URL}/admin/submissions/level`, {
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
    function sendNotification(uid, content, type){
        fetch(`${import.meta.env.VITE_API_URL}/admin/notification`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userUID: uid,
                content: content,
                type: type
            }),
        })
    }
    function accept(item, index) {
        sendNotification(item.players.uid, `Your level "${item.name}" has been accepted!`, 1)
        item.accepted = true;
        delete item.players
        fetch(`${import.meta.env.VITE_API_URL}/level/${item.id}`, {
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
        sendNotification(item.players.uid, `Your level "${item.name}" has been rejected.`, 2)
        fetch(`${import.meta.env.VITE_API_URL}/level/${item.id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            }
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

<Title value="Submit checker: Level" />
<main>
    {#each data as item, index}
        <Level data={item} />
        <input placeholder="ID" bind:value={item.id} type='number' />
        <input placeholder="Name" bind:value={item.name} />
        <input placeholder="Rating" bind:value={item.rating} type="number" />
        <button on:click={() => accept(item, index)}>Accept</button>
        <button on:click={() => reject(item, index)}>Reject</button>
    {/each}
</main>
