<script>
    export var size = 0;
    export var player;
    function setTextSize() {
        if (size == 0) return "";
        return `font-size: ${size}px`;
    }
</script>

<div class="wrapper">
    <div class="badge" title='Grandmaster' style={`${setTextSize()}; background-color: red;`}>
        GM
    </div>
    <a href={`/player/${player.uid}`}>
        <slot />
    </a>
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
