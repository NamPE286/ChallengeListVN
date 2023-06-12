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
