<script>
    import Title from "../../../components/Title.svelte";
    import { user } from "../../../stores";
    var operation = null;
    var levelID;
    var level = null;
    function fetchLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/level/${levelID}`)
            .then((res) => res.json())
            .then((data) => {
                level = data.data;
                delete level.players
            });
    }
    function updateLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/level`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(level)
        }).then((res) => {
            if (res.ok) {
                alert('Level modified')
            }
        });
    }
    function deleteLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/level/${levelID}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.ok) {
                alert('Level deleted')
            }
        });
    }
</script>

<Title value="Level editor" />
<main>
    <select name="operation" bind:value={operation}>
        <option value={null} disabled>--Select operation--</option>
        <option value={1}>Update</option>
        <option value={2}>Delete</option>
    </select>
    <input placeholder="Level ID" type="number" bind:value={levelID} />
    {#if operation == 1}
        <button on:click={fetchLevel}>Fetch</button><br />
    {/if}
    {#if operation == 2}
        <button on:click={deleteLevel}>Delete</button><br />
    {/if}
    {#if level}
        <span>Level's name: </span> <input bind:value={level.name} /><br />
        <span>Creator UID: </span> <input bind:value={level.creatorUID} />
        <br />
        <span>Length: </span>
        <select name="Length" bind:value={level.length}>
            <option value={null} disabled selected>Length</option>
            <option value={1}>Tiny</option>
            <option value={2}>Small</option>
            <option value={3}>Medium</option>
            <option value={4}>Long</option>
            <option value={5}>XL</option>
        </select><br />
        <span>Video's ID: </span> <input bind:value={level.videoID} /><br />
        <span>Rating: </span> <input bind:value={level.rating} type="number" /><br/>
        <button on:click={updateLevel}>Update</button>
    {/if}
</main>
