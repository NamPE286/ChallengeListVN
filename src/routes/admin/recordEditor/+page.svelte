<script>
    import Title from "../../../components/Title.svelte";
    import { user } from "../../../stores";
    var operation = null;
    var levelID, userUID;
    var record = null;
    function fetchLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/record/${levelID}/${userUID}`)
            .then((res) => res.json())
            .then((data) => {
                record = data;
            });
    }
    function updateLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/record`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        }).then((res) => {
            if (res.ok) {
                alert("Record modified");
            }
        });
    }
    function deleteLevel() {
        fetch(`${import.meta.env.VITE_API_URL}/record/${levelID}/${userUID}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                alert("Record deleted");
            }
        });
    }
</script>

<Title value="Record editor" />
<main>
    <select name="operation" bind:value={operation}>
        <option value={null} disabled>--Select operation--</option>
        <option value={1}>Update</option>
        <option value={2}>Delete</option>
    </select>
    <input placeholder="Level ID" type="number" bind:value={levelID} />
    <input placeholder="User UID" bind:value={userUID} />
    {#if operation == 1}
        <button on:click={fetchLevel}>Fetch</button><br />
    {/if}
    {#if operation == 2}
        <button on:click={deleteLevel}>Delete</button><br />
    {/if}
    {#if record}
        <span>Video's link: </span> <input bind:value={record.videoLink} /><br
        />
        <span>Refresh rate: </span> <input bind:value={record.refreshRate} type='number'/><br
        />
        <button on:click={updateLevel}>Update</button>
    {/if}
</main>
