<script>
    import Title from "../../../components/Title.svelte";
    import { user } from "../../../stores"
    var sendData = {
        userUID: "",
        content: "",
        type: null,
    };
    function send(){
        console.log(sendData)
        fetch(`${import.meta.env.VITE_API_URL}/admin/notification`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
        }).then((res) => {
            if (res.ok) alert('Sent')
            else {
                alert('An error occured')
                res.json().then((a) => console.log(a))
            }
        })
    }
</script>

<Title value="Notification sender" />

<main>
    <input placeholder="UUID" bind:value={sendData.userUID} /><br />
    <input placeholder="Content" bind:value={sendData.content} /><br />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Type: </label>
    <select name="type" bind:value={sendData.type}>
        <option value={null}>Other</option>
        <option value={1}>Accept</option>
        <option value={2}>Warning</option>
    </select><br />
    <button on:click={send}>Send</button>
</main>

<style lang="scss">
    input {
        width: 600px;
    }
</style>
