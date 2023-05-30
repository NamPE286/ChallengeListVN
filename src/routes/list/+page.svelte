<script>
    import Title from "../../components/Title.svelte";
    import Level from "../../components/List/Level.svelte";
</script>

<Title value="Main List" />
<main>
    <div class="levels">
        {#each Array(20) as item, index}
            <Level />
        {/each}
    </div>
    <div class="filter">
        <h3>Filter</h3>
        <div class="filterOpt">
            <span>Rating range: </span>
            <input placeholder="0" /> - <input placeholder="10000" />
        </div>
        <div class="filterOptCheck">
            <input type="checkbox" />
            <span>Show beaten levels</span>
        </div>
        <div class='left'>
            <button id='blackBtn'>Reset</button>
            <button id='whiteBtn'>Apply</button>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        gap: 20px;
        padding-inline: 80px;
    }
    .levels {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .filter {
        width: 350px;
        height: fit-content;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 20px;
        h3 {
            margin: 0;
            margin-bottom: 10px;
        }
    }
    .filterOpt {
        input {
            background-color: black;
            border: 1px solid var(--line);
            width: 50px;
            height: 20px;
            border-radius: 5px;
        }
    }
    .filterOptCheck {
        input[type="checkbox"] {
            filter: invert(1);
            accent-color: black;
        }
    }
    .left{
        display: flex;
        margin-top: 10px;
        justify-content: end;
        gap: 7px;
        #whiteBtn{
            background-color: white;
            border: 1px solid white;
            height: 30px;
            padding-inline: 10px;
            border-radius: 4px;
            transition: all 0.3s;
            cursor: pointer;
        }
        #whiteBtn:hover{
            background-color: black;
            color: white;
        }
        #blackBtn{
            background-color: black;
            color: rgb(141, 141, 141);
            border: 1px solid var(--line);
            height: 30px;
            padding-inline: 10px;
            border-radius: 4px;
            transition: all 0.3s;
            cursor: pointer;
        }
        #blackBtn:hover{
            border: 1px solid white;
            color: white;
        }
    }
    @media screen and (max-width: 1000px) {
        main {
            padding-inline: 20px;
            flex-direction: column-reverse;
        }
        .filter{
            width: 100%;
        }
    }
</style>
