<script>
    export var value
</script>

<div>
    <h1>{value}</h1>
</div>

<style lang="scss">
    div{
        height: 130px;
        background-color: black;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--line);
    }
    h1{
        margin-left: 80px;
    }
</style>