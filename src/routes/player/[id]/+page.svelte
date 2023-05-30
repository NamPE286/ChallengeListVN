<script>
</script>

<div class="header">
    <img src="https://i.pinimg.com/736x/4d/47/59/4d4759f61e13927c5f5b39a4cc66af70.jpg" alt="">
    <div class="playerInfo">
        <h1>Rophisus</h1>
        <section>
            <a href='https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww'>
                <svg id='yt'xmlns="http://www.w3.org/2000/svg" height="800" width="1200" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M93.333 117.559V47.775l61.334 34.893zm136.43-91.742c-2.699-10.162-10.651-18.165-20.747-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.555 7.652 7.603 15.655 4.904 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.904 56.849c2.699 10.163 10.65 18.165 20.747 20.883 18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.683-4.934c10.096-2.718 18.048-10.72 20.747-20.883 4.904-18.42 4.904-56.85 4.904-56.85s0-38.43-4.904-56.849" fill="#fff"/></svg>
            </a>
        </section>
    </div>
</div>
<main>
    {#each Array(10) as item, index}
    <div class="record">
        <div class='pt'>100pt</div>
        <span><b>Level's name </b><br>by Creator</span>
        <div class="recordDetail">60hz</div>
        <div class="recordDetail">Mobile</div>
        <section>
            <a href="#!">
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
                        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></svg
                >
            </a>
        </section>
    </div>
{/each}
</main>
<style lang="scss">
    main{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 30px;
        height: fit-content;
        background-color: black;
        border-bottom: 1px solid var(--line);
        display: flex;
        align-items: center;
        padding-inline: 100px;
        margin-bottom: 30px;
        img{
            height: 200px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
    .playerInfo{
        display: flex;
        flex-direction: column;
    }
    #yt{
        height: 20px;
        width: fit-content;
        scale: 1.3;
        margin-right: 5px;
    }
    section{
        overflow: auto;
        white-space: nowrap;
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        a{
            color: gray;
        }
        a:hover{
            text-decoration: underline;
        }
    }
    .record {
        height: 50px;
        width: 700px;
        border: 1px solid var(--line);
        border-radius: 10px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-right: 20px;
        svg {
            scale: 0.7;
        }
        section {
            margin-left: auto;
        }
    }
    .recordDetail {
        background-color: white;
        color: black;
        border-radius: 5px;
        padding: 3px;
        padding-inline: 4px;
        font-weight: bold;
        font-size: 12px;
        margin-left: 6px;
    }
    .pt{
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border-right: 1px solid var(--line);
        height: 100%;
        font-weight: bold;
    }
    br{
        display: none;
    }
    @media screen and (max-width: 1000px) {
        .header{
            padding-inline: 30px;
            img{
                height: 120px;
            }
        }
        .record{
            width: 100%; 
        }
        br{
            display: block;
        }
    }
</style>