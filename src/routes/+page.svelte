<script>
    import Title from "../components/Title.svelte";
    import PendingSubmission from "../components/PendingSubmission.svelte";
</script>

<Title value='Welcome back, name!'/>
<main>
    <iframe src="https://e.widgetbot.io/channels/725734982638895104/807166886390792252" height="400" width="700" title=''></iframe>
    <PendingSubmission/>    
</main>

<style lang='scss'>
    iframe{
        border: 1px solid var(--line);
        margin-left: 50px;
        border-radius: 15px;
    }
    main{
        display: flex;
    }
</style>