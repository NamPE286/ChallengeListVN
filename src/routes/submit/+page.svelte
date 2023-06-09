<script>
    import Title from "../../components/Title.svelte";
    import PendingSubmission from "../../components/PendingSubmission.svelte";
    import { user } from "../../stores";
    import Loading from "../../Loading.svelte";
    var state = 0;
    var type = "";
    var submission = {
        record: {
            userUID: null,
            levelID: null,
            videoLink: "",
            refreshRate: null,
            comment: "",
            isMobile: null,
        },
        level: {
            id: null,
            name: "",
            creatorUID: "",
            videoID: "",
            description: "",
            length: null,
        },
    };
    function submit() {
        state = 1;
        submission.record.userUID = $user.uid;
        submission.level.creatorUID = $user.uid;
        fetch(`${import.meta.env.VITE_API_URL}/submit/${type}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission[type]),
        }).then((res) => {
            if (res.ok) state = 2;
            else state = 3;
        });
    }
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
                <input
                    placeholder="Level's ID"
                    type="number"
                    bind:value={submission.record.levelID}
                />
                <input
                    placeholder="FPS"
                    type="number"
                    bind:value={submission.record.refreshRate}
                />
                <select name="platform" bind:value={submission.record.isMobile}>
                    <option value={null} disabled selected>Platform</option>
                    <option value={false}>Desktop</option>
                    <option value={true}>Mobile</option>
                </select>
                <input
                    placeholder="Video's link"
                    bind:value={submission.record.videoLink}
                />
                <input
                    placeholder="Comment (optional)"
                    bind:value={submission.record.comment}
                />
            {/if}
            {#if type == "level"}
                <input
                    placeholder="Level's ID"
                    type="number"
                    bind:value={submission.level.id}
                />
                <input
                    placeholder="Level's name"
                    bind:value={submission.level.name}
                />
                <input value={`by ${$user.name}`} readonly />
                <select name="Length" bind:value={submission.level.length}>
                    <option value={null} disabled selected>Length</option>
                    <option value={1}>Tiny</option>
                    <option value={2}>Small</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Long</option>
                    <option value={5}>XL</option>
                </select>
                <input
                    placeholder="Desciption"
                    bind:value={submission.level.description}
                />
                <input
                    placeholder="Video's ID (youtube.com/watch?v=<VIDEO's ID HERE>)"
                    bind:value={submission.level.videoID}
                />
            {/if}
            {#if type}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="right" on:click={submit}>
                    <button id="whiteBtn">Submit</button>
                    {#if state == 1}
                        <div class="loading">
                            <Loading />
                        </div>
                    {/if}
                    {#if state == 2}
                        <svg
                            id="icon"
                            class="with-icon_icon__aLCKg"
                            data-testid="geist-icon"
                            fill="none"
                            height="24"
                            shape-rendering="geometricPrecision"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                            style="color:var(--geist-foreground);width:24px;height:24px"
                            ><path d="M20 6L9 17l-5-5" /></svg
                        >
                    {/if}
                    {#if state == 3}
                        <svg
                            id="icon"
                            class="with-icon_icon__aLCKg"
                            data-testid="geist-icon"
                            fill="none"
                            height="24"
                            shape-rendering="geometricPrecision"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                            style="color:var(--geist-foreground);width:24px;height:24px"
                            ><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg
                        >
                    {/if}
                </div>
            {/if}
        </div>
        <PendingSubmission />
    </main>
{/if}

<style lang="scss">
    .loading {
        margin-top: -38px;
        margin-left: -23px;
        max-height: 35px;
        scale: 0.9;
    }
    #icon {
        margin-left: 5px;
    }
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
        align-items: center;
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
