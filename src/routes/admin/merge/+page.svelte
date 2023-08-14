<script>
    import Title from "../../../components/Title.svelte";
    import { user } from "../../../stores"

    var from = '', to = ''

    async function merge() {
        fetch(`${import.meta.env.VITE_API_URL}/admin/mergePlayer/${from}/${to}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.ok) alert('Merged!')
            else {
                alert('An error occured')
                res.json().then((a) => console.log(a))
            }
        })
    }
</script>

<Title value='Account merger'/>

<main>
    <input placeholder="From (uid)" bind:value={from}>
    <input placeholder="To (uid)" bind:value={to}>
    <button on:click={merge}>Merge</button>
    <p>Note: Old account will be deleted. Two account have one or more same record cannot be merged</p>
</main>