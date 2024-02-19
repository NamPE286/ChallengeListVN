<script>
    import Title from "../../components/Title.svelte";
    import { user } from "../../stores";
    import { supabase } from "../../db";
    import { toast } from '../../toast'
    var basicInfo = null;
    $: $user && updateInfo();
    function updateInfo() {
        basicInfo = {
            uid: $user.uid,
            name: $user.name,
            youtube: $user.youtube,
            facebook: $user.facebook,
            discord: $user.discord,
            bannerImage: $user.bannerImage
        };
    }
    function basicInfoSave() {
        fetch(`${import.meta.env.VITE_API_URL}/player`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${$user.session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(basicInfo),
        }).then((res) => {
            if (res.ok) {
                toast('Basic info updated!');
            }
        });
    }
    async function signOut() {
        await supabase.auth.signOut();
    }
</script>

<Title value="Settings" />
<main>
    {#if $user}
        <div class="sectionWrapper">
            <div class="settingSection" id="signOut">
                <h2>Sign Out</h2>
                <button class="redBtn clickable" on:click={signOut}
                    >Sign Out</button
                >
            </div>
        </div>
        <div class="sectionWrapper">
            <div class="settingSection">
                <h2>Basic info</h2>
                <section>
                    <div class='textWrapper'>Username </div><input
                        bind:value={basicInfo.name}
                    /><br />
                </section>
                <section>
                    <div class='textWrapper'>Banner image URL </div><input
                        bind:value={basicInfo.bannerImage}
                    /><br />
                </section>
                <section>
                    <div class='textWrapper'>YouTube </div><input
                        placeholder="YouTube channel's link"
                        bind:value={basicInfo.youtube}
                    /><br />
                </section>
                <section>
                    <div class='textWrapper'>Facebook </div><input
                        placeholder="Facebook profile's link"
                        bind:value={basicInfo.facebook}
                    /><br />
                </section>
                <section>
                    <div class='textWrapper'>Discord </div><input
                        placeholder="Discord tag"
                        bind:value={basicInfo.discord}
                    /><br />
                </section>
            </div>
            <div class="sectionFooter">
                <button id="whiteBtn" on:click={basicInfoSave}>Save</button>
            </div>
        </div>
    {/if}
    <div class="sectionWrapper">
        <div class="settingSection">
            <h2>Theme</h2>
            <select name="theme">
                <option>Dark</option>
            </select>
        </div>
        <div class="sectionFooter">
            <button id="whiteBtn" on:click={() => {
                toast('Theme configuration saved!')
            }}>Save</button>
        </div>
    </div>
</main>

<style lang="scss">
    .textWrapper {
        background-color: #111111;
        height: 41px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: 20px;
        border-radius: 8px 0 0 8px;
        white-space: nowrap;
    }
    .sectionFooter {
        background-color: #111111;
        padding: 12px;
        padding-inline: 20px;
        border-radius: 0 0 10px 10px;
        border-top: 1px var(--line) solid;
        display: flex;
        flex-direction: row-reverse;
    }
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
    #signOut {
        display: flex;
        align-items: center;
        h2 {
            margin: 0;
        }
        button {
            margin-left: auto;
        }
    }
    .sectionWrapper {
        box-sizing: border-box;
        border: 1px var(--line) solid;
        border-radius: 10px;
        background-color: black;
        margin-bottom: 30px;
    }
    .settingSection {
        padding-inline: 30px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    input {
        border: none;
        border-left: 1px var(--line) solid;
        background-color: black;
        color: white;
        height: 40px;
        width: 200px;
        padding-inline: 12px;
        border-radius: 0 10px 10px 0;
        width: 100%;
    }
    section {
        margin-bottom: 10px;
        border: 1px var(--line) solid;
        width: fit-content;
        border-radius: 10px;
        background-color: black;
        color: rgb(170, 170, 170);
        width: 100%;
        display: flex;
        align-items: center;
    }
    .redBtn {
        border: none;
        background-color: #5b0000;
        padding: 8px;
        padding-inline: 15px;
        color: #ff0000;
        border-radius: 10px;
        transition: background-color 0.2s;
    }
    .redBtn:hover {
        background-color: rgb(128, 0, 0);
    }
    select {
        width: 300px;
        height: 40px;
        border-radius: 10px;
        color: white;
        background-color: black;
        padding-inline: 10px;
        border: 1px var(--line) solid;
    }
    @media screen and (min-width: 1001px) {
        main {
            width: 800px;
            margin-inline: auto;
        }
    }
    @media screen and (max-width: 1001px) {
        select {
            width: 100%;
        }
    }
</style>
