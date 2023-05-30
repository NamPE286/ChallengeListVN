<script>
    import { fly } from 'svelte/transition'
</script>

<div class="wrapper" transition:fly={{ y: -20, duration: 300 }}>
    <h4>Notifications</h4>
    <hr class="bottom" />
    <div class="notif">
        <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/></svg>
        <p>
            Your submission of Blablabla has been accepted.<br /><span>1d ago</span>
        </p>
    </div>
    <hr />
    <div class="clrAllText clickable">
        <span>Clear All</span>
    </div>
</div>

<style lang="scss">
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
        z-index: 12;
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
    .notif{
        display: flex;
        align-items: center;
        svg{
            margin-inline: 20px;
            scale: 1.4;
            stroke: limegreen;
        }
    }
    @media screen and (max-width: 1000px){
        .wrapper{
            width: calc(100% - 30px);
            right: 15px;
        }
    }
</style>
