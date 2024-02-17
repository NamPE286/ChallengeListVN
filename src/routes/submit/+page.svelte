<script>
    import Title from "../../components/Title.svelte";
    import Level from "../../components/List/Level.svelte"
    import PendingSubmission from "../../components/PendingSubmission.svelte";
    import { user } from "../../stores";
    import { toast } from "../../toast";
    import Loading from "../../Loading.svelte";
    var state = 0;
    var type = "";
    var submittingLevel = undefined
    var submission = {
        record: {
            userUID: null,
            levelID: null,
            videoLink: null,
            refreshRate: null,
            comment: null,
            isMobile: null,
            time: null
        },
        level: {
            id: null,
            name: null,
            creatorUID: null,
            videoID: null,
            description: null,
            length: null,
        },
    };
    function fetchLevel(id) {
        if(id == null) {
            toast("Please enter a level ID")
            return
        }

        console.log(id)
        fetch(`${import.meta.env.VITE_API_URL}/level/${id}`).then(
            (res) =>
                res.json().then((data) => {
                    console.log(data)
                    if(data.data == null) {
                        toast("Invalid level ID")
                        return
                    }

                    submittingLevel = data.data;
                })
        );
    }
    function youtube_parser(url) {
        var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    }

    function parseTime(s) {
        var a = s.split(':').reverse()
        var res = 0

        for(let i = 0; i < a.length; i++) {
            if(i == 0) {
                res += a[i] * 1000
                continue
            }

            let sec = a[i] * 60 * i
            res += sec * 1000
        }

        console.log(res)

        return res
    }

    function submit() {
        state = 1;
        submission.record.userUID = $user.uid;
        submission.level.creatorUID = $user.uid;
        for(const i in submission[type]){
            if(submission[type][i] === null){
                state = 3
                toast('Please fill in all the fields.')
                return
            }
        }
        if(type == 'level') {
            submission.level.videoID = youtube_parser(submission.level.videoID)
        }

        if(type == 'record' && submittingLevel.length == -1) {
            submission.record.time = parseTime(submission.record.time)
            console.log(submission.record.time)
        }

        fetch(`${import.meta.env.VITE_API_URL}/submit/${type}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission[type]),
        }).then((res) => {
            if (res.ok) state = 2;
            else if(res.status == 404){
                state = 3
                toast("Level doesn't exist.")
            }
            else if (res.status == 406){
                state = 3
                toast('This level doesn\'t accept new record.')
            }
            else if(res.status == 409){
                state = 3
                toast('Record already exist or better record is accepted.')
            }
            else {
                state = 3;
                toast('An error occured.')
            }
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
                    on:blur={() => {fetchLevel(submission.record.levelID)}}
                />

                {#if typeof submittingLevel != "undefined"}
                    <Level data={submittingLevel} mode="compact-fit"/>
                    {#if submittingLevel.length == -1}
                        <input
                            placeholder="Time (m:s.ms) (e.g: 1:20.117)"
                            type="input"
                            bind:value={submission.record.time}
                        />
                    {/if}
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
                    <option value={2}>Short</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Long</option>
                    <option value={5}>XL</option>
                    <option value={-1}>Platformer</option>
                </select>
                <input
                    placeholder="Description"
                    bind:value={submission.level.description}
                />
                <input
                    placeholder="Video's link"
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
