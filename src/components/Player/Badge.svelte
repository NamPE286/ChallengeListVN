<script>
    export var size = 0;
    export var player;
    function setTextSize() {
        if (size == 0) return "";
        return `font-size: ${size}px`;
    }
</script>

<div class="wrapper">
    {#if player.uid == "c396bf2f-6cc5-4629-baf2-ca1ad744bbfa"}
        <div
            class="badge"
            title="Developer"
            style={`${setTextSize()}; background-image: linear-gradient( 173.1deg,  rgba(226,66,249,0.94) 10.2%, rgba(79,147,249,1) 77.3% );`}
        >
            DEV
        </div>
    {/if}
    {#if player.rating >= 5000}
        <div
            class="badge"
            title="Legendary Grandmaster"
            style={`${setTextSize()}; background-color: darkred;`}
        >
            LGM
        </div>
    {:else if player.rating >= 3500}
        <div
            class="badge"
            title="Grandmaster"
            style={`${setTextSize()}; background-color: red;`}
        >
            GM
        </div>
    {:else if player.rating >= 2500}
        <div
            class="badge"
            title="Master"
            style={`${setTextSize()}; background-color: darkorange;`}
        >
            M
        </div>
    {:else if player.rating >= 2000}
        <div
            class="badge"
            title="Candidate Master"
            style={`${setTextSize()}; background-color: purple;`}
        >
            CM
        </div>
    {:else if player.rating >= 1500}
        <div
            class="badge"
            title="Expert"
            style={`${setTextSize()}; background-color: blue}
        >
            EX
        </div>
    {:else if player.rating >= 1000}
        <div
            class="badge"
            title="S"
            style={`${setTextSize()}; background-color: gold;`}
        >
            S
        </div>
    {:else if player.rating >= 800}
        <div
            class="badge"
            title="A"
            style={`${setTextSize()}; background-color: green;`}
        >
            A
        </div>
    {:else if player.rating >= 600}
        <div
            class="badge"
            title="B"
            style={`${setTextSize()}; background-color: darkblue;`}
        >
            B
        </div>
    {:else if player.rating >= 400}
        <div
            class="badge"
            title="C"
            style={`${setTextSize()}; background-color: gray;`}
        >
            C
        </div>
    {/if}
    <slot />
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        align-items: center;
        color: white;
    }
    .badge {
        user-select: none;
        padding: 4px;
        border-radius: 5px;
        font-weight: 600;
        vertical-align: middle;
        margin-right: 5px;
        font-size: 10px;
        font-weight: bold;
    }
</style>
