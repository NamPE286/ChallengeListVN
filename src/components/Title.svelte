<script>
    export var value
    export var alt = ''
</script>

<svelte:head>
    <title>{alt ? alt : value} - Challenge List VN</title>
</svelte:head>

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
        margin-bottom: 30px;
    }
    h1{
        margin-left: 80px;
    }
    @media screen and (max-width: 1000px) {
        h1{
            margin-left: 30px;
        }
    }
</style>