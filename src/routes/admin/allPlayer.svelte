<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	var players = [];
	async function getData() {
		var { data, error } = await supabase.from("players").select("*");
		players = data;
	}
	getData();
    var n
    async function addPlayer(){
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/player`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: supabase.auth.session().access_token,
					data : {
						name:n,
						country: 'VI'
					}
				})
			})
				.then((data) => {
					alert('Player added')
					window.location.reload()
				})
    }
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="Player manager" description="" />
        <div>
            <button on:click={addPlayer}>Add player</button>
            <input bind:value={n}>
        </div>
		{#each players as item, index}
			<a href={`/player?id=${item.uid}`} target="_blank">{item.name}</a>
		{/each}
	</div>
{/if}

<style lang="scss">
	a {
		text-decoration: none;
		color: var(--textColor);
	}
	#title {
		font-size: 25px;
	}
	#bla {
		margin-left: 50px;
	}
	.pageContent {
		display: grid;
		gap: 30px;
		grid-template-areas:
			"header"
			"widget";
		grid-auto-columns: 1fr;
	}
	.submit {
		grid-area: widget;
		height: 160px;
		width: 100%;
		background-color: var(--color23);
		border-radius: 50px;
		p {
			margin-left: 50px;
			font-size: 16px;
		}
	}

</style>
