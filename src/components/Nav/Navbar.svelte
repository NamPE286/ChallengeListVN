<script>
    import Notifications from "./Notifications.svelte";
    import Search from "./Search.svelte";
    import { page } from "$app/stores";
    var isNotificationOn = false;
    var isSearchOn = false;
    var firstPath = "";
    function getFirstPath() {
        var s = $page.url.pathname;
        var a = s.split("/");
        if (a.length > 0) firstPath = a[1];
        else firstPath = "";
        console.log(firstPath);
    }
    $: $page.url.pathname && getFirstPath();
</script>

<div class="wrapper">
    <div class="upper">
        <h3>Challenge List VN</h3>
        <div class="right">
            <a href="#!" class="submitBtn">Submit</a>
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
            <img
                src="https://i.pinimg.com/736x/4d/47/59/4d4759f61e13927c5f5b39a4cc66af70.jpg"
                alt=""
            />
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
        <a href="#!" class="link">
            <div class={firstPath == "leaderboard" ? "selected" : ""}>
                Leaderboard
                <section />
            </div>
        </a>
        <a href="#!" class="link">
            <div class={firstPath == "rules" ? "selected" : ""}>
                Rules
                <section />
            </div>
        </a>
        <a href="#!" class="link">
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
    <Notifications />
{/if}
{#if isSearchOn}
    <Search />
{/if}

<style lang="scss">
    .wrapper {
        background-color: black;
        border-bottom: 1px solid var(--line);
        padding: 5px;
        padding-inline: 30px;
        position: fixed;
        width: calc(100% - 60px);
        z-index: 10;
    }
    .filler {
        height: 90px;
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
        border-radius: 50%;
    }
    .lower {
        display: flex;
        align-items: center;
        height: 30px;
        position: sticky;
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
    .submitBtn {
        background-color: #00285b;
        padding: 8px;
        padding-inline: 15px;
        color: #00b1ff;
        border-radius: 10px;
    }
</style>
