<script>
    export var data;
    export var mode = null;
</script>

<div class="wrapper" id={mode}>
    <div class="imgWrapper">
        <a href={`/level/${data.id}`}>
            <img
                src={`https://img.youtube.com/vi/${data.videoID}/0.jpg`}
                alt=""
                loading="lazy"
            />
            <div class="top pt">{data.rating}pt</div>
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
    .imgWrapper {
        position: relative;
        .top {
            position: absolute;
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
            bottom: 0;
            margin-bottom: 8px;
        }
        .pt {
            width: fit-content;
            padding-inline: 10px;
            font-weight: bold;
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
    }
</style>
