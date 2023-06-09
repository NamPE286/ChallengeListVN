<script>
    import Title from "../../../../components/Title.svelte";
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
                console.log(dat);
            });
    }
    function sendNotification(uid, content, type) {
        fetch(`${import.meta.env.VITE_API_URL}/admin/notification`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userUID: uid,
                content: content,
                type: type,
            }),
        })
            .then((res) => res.json())
            .then((dat) => console.log(dat));
    }
    function accept(item, index) {
        sendNotification(
            item.players.uid,
            `Your record of level "${item.levels.name}" by ${item.levels.players.name} has been accepted!`,
            1
        );
        item.accepted = true;
        delete item.players;
        delete item.levels;
        fetch(`${import.meta.env.VITE_API_URL}/record`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        }).then((res) => {
            if (res.ok) {
                data.splice(index, 1);
                data = data;
            }
        });
    }
    function reject(item, index) {
        sendNotification(
            item.players.uid,
            `Your record of level "${item.levels.name}" by ${item.levels.players.name} has been rejected.`,
            2
        );
        fetch(`${import.meta.env.VITE_API_URL}/record`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        }).then((res) => {
            if (res.ok) {
                data.splice(index, 1);
                data = data;
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
        <div>
            <span>
                <a href={`/level/${item.levelID}`}>
                    <h3>
                        {item.levels.name} by {item.levels.players.name} ({item.levelID})
                    </h3>
                </a>
                <br />
                Player: {item.players.name} ({item.players.uid}) <br />
                Video link: <a href={item.videoLink}>{item.videoLink}</a>
            </span><br />
            <button on:click={() => accept(item, index)}>Accept</button>
            <button on:click={() => reject(item, index)}>Reject</button>
            <br />
        </div>
    {/each}
</main>

<style lang="scss">
    div {
        background-color: rgb(39, 39, 39);
        padding: 15px;
        border-radius: 15px;
        margin-bottom: 10px;
        h3{
            margin: 0;
        }
        button{
            margin-top: 10px;
        }
        a{
            color: rgb(0, 195, 255);
        }
    }
</style>
