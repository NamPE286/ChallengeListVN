<script>
    import Title from "../../components/Title.svelte";
    import PendingSubmission from "../../components/PendingSubmission.svelte";
</script>

<Title value='Submit'/>
<main>
    <div class='submitForm'>
        <input placeholder="Level's ID" type="number">
        <input placeholder="FPS">
        <select name='platform'>
            <option value='' disabled selected>Platform</option>
            <option value='desktop'>Desktop</option>
            <option value='mobile'>Mobile</option>
        </select>
        <input placeholder="Video's link">
        <input placeholder="Comment (optional)">
        <div class='right'>
            <button id='whiteBtn'>Submit</button>
        </div>
    </div>
    <PendingSubmission/>
</main>

<style lang="scss">
    main{
        display: flex;
        gap: 20px;
    }
    input{
        background-color: black;
        border: 1px solid var(--line);
        height: 40px;
        width: 400px;
        box-sizing: border-box;
        border-radius: 10px;
        padding-inline: 10px;
        color: white;
    }
    select{
        background-color: black;
        border: 1px solid var(--line);
        height: 40px;
        width: 400px;
        box-sizing: border-box;
        border-radius: 10px;
        padding-inline: 7px;
        color: white;
    }
    .submitForm{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .right{
        display: flex;
        margin-top: 10px;
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
    }
</style>