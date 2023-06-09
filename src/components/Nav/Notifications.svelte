<script>
    export var enabled = false;
    import { fly } from "svelte/transition";
    import { user } from "../../stores";
    import Loading from "../../Loading.svelte";
    import { supabase } from "../../db";
    var clearing = false;
    async function clearAll() {
        clearing = true;
        await supabase.from("notifications").delete().eq("userUID", $user.uid);
        clearing = false;
        $user.notifications = [];
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="backdrop"
    on:click={() => {
        enabled = false;
    }}
/>
<div class="wrapper" transition:fly={{ y: -20, duration: 300 }}>
    <h4>Notifications</h4>
    {#if $user.notifications.length}
        <hr class="bottom" />
    {/if}
    {#if !$user.notifications.length}
        <p id='noText'>No notification</p>
    {/if}
    {#each $user.notifications as item, index}
        <div class="notif">
            {#if item.type == 1}
                <svg
                    id="type1"
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
                        d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                    /></svg
                >
            {/if}
            {#if item.type == 2}
                <svg
                    id="type2"
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
                    ><path
                        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        fill="var(--geist-fill)"
                    /><path d="M12 9v4" stroke="var(--geist-stroke)" /><path
                        d="M12 17h.01"
                        stroke="var(--geist-stroke)"
                    /></svg
                >
            {/if}
            <p>
                {item.content}<br /><span
                    >{new Date(item.timestamp).toLocaleString("vi-VN")}</span
                >
            </p>
        </div>
        <hr />
    {/each}
    {#if $user.notifications.length}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="clrAllText clickable" on:click={clearAll}>
            {#if !clearing}
                <span>Clear All</span>
            {/if}
            {#if clearing}
                <Loading />
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    #noText{
        text-align: center;
        color: gray;
    }
    .backdrop {
        position: fixed;
        margin-top: -135px;
        height: 200%;
        width: 200%;
        z-index: 12;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .wrapper {
        height: fit-content;
        max-height: 350px;
        width: 400px;
        background-color: black;
        position: fixed;
        top: 60px;
        right: 10px;
        border-radius: 15px;
        border: 1px solid var(--line);
        box-sizing: border-box;
        z-index: 13;
    }
    h4 {
        margin-left: 20px;
    }
    hr {
        border: 1px solid var(--line);
        margin: 0;
    }
    .bottom {
        margin-top: auto;
    }
    p {
        span {
            color: gray;
        }
    }
    .clrAllText {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .notif {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-inline: 20px;
        svg {
            margin-right: 20px;
            scale: 1.4;
        }
        #type1 {
            stroke: limegreen;
        }
        #type2 {
            stroke: orange;
        }
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            width: calc(100% - 30px);
            right: 15px;
        }
    }
</style>
