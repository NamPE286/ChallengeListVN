<script>
    export var title;
    export var link;

    import { page } from "$app/stores";

    var firstPath = "";

    function getFirstPath() {
        var s = $page.url.pathname;
        var a = s.split("/");
        if (a.length > 0) firstPath = a[1];
        else firstPath = "";
    }

    $: $page.url.pathname && getFirstPath();
</script>

<a href={`/${link}`} class="link">
    <div class={firstPath == link ? "selected" : link}>
        {title}
        <section />
    </div>
</a>

<style lang="scss">
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
</style>
