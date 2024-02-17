<script>
    export var data;
    export var mode = null;

    var len = ["", "Tiny", "Short", "Medium", "Long", "XL"]

    function getLen(x) {
        if(x == -1) {
            return "Plat."
        }

        return len[x]
    }
</script>

<div class="wrapper" id={mode}>
    <div class="imgWrapper">
        <a href={`/level/${data.id}`}>
            <img
                src={`https://img.youtube.com/vi/${data.videoID}/0.jpg`}
                alt=""
                loading="lazy"
            />
            <div class="infoWrapper">
                <div class="top pt">{data.rating}pt</div>
                <div class="top pt">
                    <svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground);width:24px;height:24px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {getLen(data.length)}
                </div>
            </div>
        </a>
    </div>
    <div class="info">
        <a href={`/level/${data.id}`}>
            <h2>{data.name}</h2>
            <span>by {data.players.name}</span>
        </a>
        <div id="ID">ID: {data.id}</div>
    </div>
</div>

<style lang="scss">
    #compact{
        height: 120px;
        padding-top: 10px;
        padding-bottom: 10px;
        img{
            height: 100%;
            width: 15vh;
        }
    }
    #fit{
        width: 100%;
    }
    #compact-fit{
        height: 120px;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        img{
            height: 100%;
            width: 15vh;
        }
    }
    .wrapper {
        position: relative;
        display: flex;
        height: fit-content;
        width: 800px;
        background-color: black;
        border: 1px solid var(--line);
        border-radius: 15px;
        padding: 15px;
        box-sizing: border-box;
        img {
            height: 168.75px;
            width: 300px;
            border-radius: 15px;
            margin-right: 20px;
            object-fit: cover;
        }
        .info {
            display: flex;
            flex-direction: column;
            h2 {
                margin-bottom: 0;
            }
            span {
                color: rgb(184, 184, 184);
            }
        }
        #ID {
            margin-top: auto;
            margin-bottom: 10px;
            color: rgb(184, 184, 184);
        }
    }

    .infoWrapper {
        display: flex;
        position: absolute;
        height: 30px;
        width: 30px;
        bottom: 0;
        margin-bottom: 8px;
    }

    .imgWrapper {
        position: relative;
        .top {
            background-color: black;
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            border: 1px solid var(--line);
            margin-left: 5px;
            font-weight: bold;
        }
        .pt {
            width: fit-content;
            padding-inline: 10px;
            font-weight: bold;

            svg {
                margin-left: -5px;
                margin-right: 5px;
                scale: 0.9;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .wrapper {
            flex-direction: column;
            width: 100%;
            height: fit-content;
            img {
                width: 100%;
                height: 55vw;
            }
        }
        #compact-fit{
            flex-direction: row;
        }
        #compact{
            flex-direction: row;
        }
    }
</style>
