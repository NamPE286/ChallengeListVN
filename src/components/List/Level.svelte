<div class="wrapper">
    <div class="imgWrapper">
        <img
            src="https://i.ytimg.com/vi/4cWokwztucQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAQQiKl5dTCjFnxpUsPFsIUxYOS3g"
            alt=""
        />
        <div class="top">#1</div>
        <div class="top pt">100pt</div>
    </div>
    <div class="info">
        <a href='/level/12345678'>
            <h2>Level's name</h2>
            <span>by Creator</span>    
        </a>
        <div id="ID">ID: 12345678</div>
    </div>
</div>

<style lang="scss">
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
            height: 150px;
            border-radius: 15px;
            margin-right: 20px;
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
            margin-left: 40px;
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
                height: auto;
            }
        }
    }
</style>
