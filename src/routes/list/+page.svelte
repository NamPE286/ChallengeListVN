<script>
    import Title from "../../components/Title.svelte";
    import Level from "../../components/List/Level.svelte";
</script>

<Title value='Main List'/>
<main>
    {#each Array(20) as item, index}
        <Level/>
    {/each}
</main>

<style lang='scss'>
    main{
        padding-inline: 80px;
    }
</style>