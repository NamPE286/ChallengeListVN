<script>
    import Title from "../../components/Title.svelte";
    import { user } from "../../stores";
    function refresh() {
        fetch(`${import.meta.env.VITE_API_URL}/admin/refresh`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
            },
        }).then((res) => {
            if (res.ok) {
                alert("Refreshed");
            }
        });
    }
</script>

<Title value="Admin" />
<main>
    <button on:click={refresh}>Refresh list</button><br />
    <a href="#!">Level editor</a><br />
    <a href="#!">Record editor</a><br />
    <a href="/admin/notification">Notification sender</a><br />
    <span>Submit checker:</span>
    <a href="/admin/submitChecker/level">Level</a>
    <a href="/admin/submitChecker/record">Record</a>
</main>

<style lang="scss">
    a {
        text-decoration: underline;
        color: rgb(0, 153, 255);
    }
</style>
