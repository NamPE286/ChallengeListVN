<script>
    var value = ''
</script>

<div class="wrapper">
    <input placeholder="Type to search" bind:value>
    {#if value}
        <div class="result">
            <h4>Level result</h4>
            <section>
                <a href="#!">Level's name by Creator - 12345678</a>
            </section>
        </div>
        <div class="result">
            <h4>Player result</h4>
            <section>
                <img src="https://avatars.githubusercontent.com/u/42766704?v=4" alt=''>
                <a href="#!">Zophirux</a>
            </section>
        </div>
    {/if}
</div>

<style lang="scss">
    .wrapper{
        position: absolute;
        margin-top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
    }
    input{
        background-color: black;
        border: 1px solid var(--line);
        height: 55px;
        width: 100%;
        border-radius: 10px;
        font-size: 16px;
        box-sizing: border-box;
        padding-inline: 25px;
        color: white;
    }
    .result{
        background-color: black;
        border: 1px solid var(--line);
        height: fit-content;
        max-height: 300px;
        margin-top: 15px;
        border-radius: 10px;
        padding: 20px;
        h4{
            margin: 0;
            padding-bottom: 10px;
        }
        section{
            margin-top: 10px;
            display: flex;
            align-items: center;
            img{
                border-radius: 50%;
                height: 25px;
                margin-right: 10px;
            }
        }
        a{
            color: rgb(161, 161, 161);
        }
    }
</style>