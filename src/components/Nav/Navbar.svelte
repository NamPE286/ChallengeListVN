<script>
    import Notifications from "./Notifications.svelte";
    import Search from "./Search.svelte";
    import { user } from "../../stores";
    import { supabase } from "../../db";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    var isNotificationOn = false;
    var isSearchOn = false;
    var firstPath = "";
    function getFirstPath() {
        var s = $page.url.pathname;
        var a = s.split("/");
        if (a.length > 0) firstPath = a[1];
        else firstPath = "";
    }
    async function signIn() {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    }
    $: $page.url.pathname && getFirstPath();
    onMount(() => {
        supabase.auth.onAuthStateChange((_, session) => {
            if (!session) {
                $user = null;
                return;
            }
            fetch(`${import.meta.env.VITE_API_URL}/auth/getUser`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${session.access_token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    data['session'] = session
                    $user = data;
                });
        });
    });
</script>

<div class="wrapper">
    <div class="upper">
        <a href="/">
            <h3>Challenge List VN</h3>
        </a>
        <div class="right">
            {#if !$user}
                <button
                    href="/submit"
                    class="blueBtn clickable"
                    on:click={signIn}>Sign In</button
                >
            {/if}
            {#if $user}
                <a href="/submit" class="blueBtn">Submit</a>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg
                    class="clickable"
                    on:click={() => {
                        isNotificationOn = !isNotificationOn;
                    }}
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
                    style="color:var(--geist-foreground)"
                    ><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path
                        d="M13.73 21a2 2 0 01-3.46 0"
                    /></svg
                >
                <a href={`/player/${$user.uid}`}>
                    <img
                        src={`https://lh3.googleusercontent.com/a/${$user.googleAvatarID}=s96-c`}
                        alt=""
                    />
                </a>
            {/if}
        </div>
    </div>
    <div class="lower">
        <a href="/" class="link">
            <div class={firstPath == "" ? "selected" : ""}>
                Dashboard
                <section />
            </div>
        </a>
        <a href="/list" class="link">
            <div class={firstPath == "list" ? "selected" : ""}>
                List
                <section />
            </div>
        </a>
        <a href="/leaderboard" class="link">
            <div class={firstPath == "leaderboard" ? "selected" : ""}>
                Leaderboard
                <section />
            </div>
        </a>
        <a href="/rules" class="link">
            <div class={firstPath == "rules" ? "selected" : ""}>
                Rules
                <section />
            </div>
        </a>
        <a href="/settings" class="link">
            <div class={firstPath == "settings" ? "selected" : ""}>
                Settings
                <section />
            </div>
        </a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="searchIcon clickable"
            on:click={() => {
                isSearchOn = !isSearchOn;
            }}
        >
            <svg
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
                style="color:var(--geist-foreground)"
                ><path
                    d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
                /><path d="M16 16l4.5 4.5" /></svg
            >
        </div>
    </div>
</div>
<div class="filler" />
{#if isNotificationOn}
    <Notifications bind:enabled={isNotificationOn} />
{/if}
{#if isSearchOn}
    <Search bind:enabled={isSearchOn} />
{/if}

<style lang="scss">
    .wrapper {
        background-color: black;
        border-bottom: 1px solid var(--line);
        padding: 5px;
        padding-inline: 30px;
        box-sizing: border-box;
        position: fixed;
        width: 100%;
        z-index: 10;
    }
    .filler {
        height: 90px;
        background-color: black;
    }
    .upper {
        display: flex;
        align-items: center;
        height: 50px;
    }
    .right {
        margin-left: auto;
        display: flex;
        align-items: center;
        svg {
            margin-inline: 15px;
            height: 20px;
        }
    }

    h3 {
        padding: 0;
        margin: 0;
        margin-left: 10px;
    }
    img {
        height: 40px;
        width: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .lower {
        display: flex;
        align-items: center;
        height: 30px;
        position: relative;
    }
    .lower::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
    .link {
        padding-inline: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 10px;
        transition: all 0.2s;
        color: gray;
    }
    .link:hover {
        background-color: #333333;
        color: white;
    }
    .selected {
        position: relative;
        color: white;
        section {
            position: absolute;
            height: 3px;
            background-color: white;
            border-radius: 10px;
            width: 100%;
            margin-top: 11px;
            pointer-events: none;
        }
    }
    .searchIcon {
        svg {
            stroke: gray;
        }
        margin-inline: 10px;
        padding: 3px;
        border-radius: 10px;
        transition: all 0.2s;
    }
    .searchIcon:hover {
        background-color: #333333;
        svg {
            stroke: white;
        }
    }
    .blueBtn {
        border: none;
        background-color: #00285b;
        padding: 8px;
        padding-inline: 15px;
        color: #00b1ff;
        border-radius: 10px;
        transition: background-color 0.2s;
    }
    .blueBtn:hover {
        background-color: rgb(0, 55, 128);
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            padding-inline: 10px;
        }
        .lower {
            overflow-x: auto;
            box-sizing: border-box;
            height: 45px;
        }
        .filler {
            height: 105px;
        }
    }
</style>
