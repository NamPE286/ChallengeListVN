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
        fetch(`${import.meta.env.VITE_API_URL}/record/${item.levels.id}/${item.players.uid}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.ok) {
                data.splice(index, 1);
                data = data;
            }
        });
    }
    function parseTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if(hrs == 0) {
            return mins + ':' + secs + '.' + ms;
        }

        return hrs + ':' + mins + ':' + secs + '.' + ms;
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
                </a><br />

                {#if item.levels.length == -1}
                    <h3>{parseTime(item.time)}</h3><br/>
                {/if}

                Player: {item.players.name} ({item.players.uid}) <br />
                Video link: <a href={item.videoLink}>{item.videoLink}</a><br>
                Comment: {item.comment}
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
