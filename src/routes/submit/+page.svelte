<script>
    import Title from "../../components/Title.svelte";
    import PendingSubmission from "../../components/PendingSubmission.svelte";
    import { user } from "../../stores";
    var type = "";
    var submission = {
        record: {
            userUID: $user.uid,
            levelID: null,
            videoLink: '',
            refreshRate: null,
            comment: '',
            isMobile: null
        },
        level: {
            id: null,
            name: '',
            creator: '',
            videoID: '',
            description: ''
        },
    };
</script>

<Title value="Submit" />
{#if $user}
    <main>
        <div class="submitForm">
            <select name="list" bind:value={type}>
                <option value="" disabled selected>Submission Type</option>
                <option value="record">Record</option>
                <option value="level">Level</option>
            </select>
            {#if type == "record"}
                <input placeholder="Level's ID" type="number" bind:value={submission.record.levelID}/>
                <input placeholder="FPS" bind:value={submission.record.refreshRate} />
                <select name="platform" bind:value={submission.record.isMobile}>
                    <option value={null} disabled selected>Platform</option>
                    <option value={false}>Desktop</option>
                    <option value={true}>Mobile</option>
                </select>
                <input placeholder="Video's link" bind:value={submission.record.videoLink}/>
                <input placeholder="Comment (optional)" bind:value={submission.record.comment} />
            {/if}
            {#if type == "level"}
                <input placeholder="Level's ID" type="number" bind:value={submission.level.id}/>
                <input placeholder="Level's name" bind:value={submission.level.name}/>
                <input value={`by ${$user.name}`} readonly/>
                <input placeholder="Desciption" bind:value={submission.level.description}/>
                <input placeholder="Video's ID (youtube.com/watch?v=<VIDEO's ID HERE>)" bind:value={submission.level.videoID}/>
            {/if}
            {#if type}
                <div class="right">
                    <button id="whiteBtn">Submit</button>
                </div>
            {/if}
        </div>
        <PendingSubmission />
    </main>
{/if}

<style lang="scss">
    main {
        display: flex;
        gap: 20px;
    }
    input {
        background-color: black;
        border: 1px solid var(--line);
        height: 40px;
        width: 400px;
        box-sizing: border-box;
        border-radius: 10px;
        padding-inline: 10px;
        color: white;
    }
    select {
        background-color: black;
        border: 1px solid var(--line);
        height: 40px;
        width: 400px;
        box-sizing: border-box;
        border-radius: 10px;
        padding-inline: 7px;
        color: white;
    }
    .submitForm {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .right {
        display: flex;
        margin-top: 10px;
        gap: 7px;
        #whiteBtn {
            background-color: white;
            border: 1px solid white;
            height: 30px;
            padding-inline: 10px;
            border-radius: 4px;
            transition: all 0.3s;
            cursor: pointer;
        }
        #whiteBtn:hover {
            background-color: black;
            color: white;
        }
    }
    @media screen and (max-width: 1000px) {
        main {
            flex-direction: column-reverse;
        }
        input {
            width: 100%;
        }
        select {
            width: 100%;
        }
    }
</style>
