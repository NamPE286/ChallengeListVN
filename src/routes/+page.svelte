<script>
    import Title from "../components/Title.svelte";
    import { user } from '../stores'
    import PendingSubmission from "../components/PendingSubmission.svelte";
    import DailyLevel from "../components/DailyLevel.svelte";
</script>

<Title value={$user ? `Welcome, ${$user.name}`: `Welcome`} alt='Dashboard'/>

<main>
    <iframe src="https://e.widgetbot.io/channels/725734982638895104/807166886390792252" height="400" width="700" title=''></iframe>
    <DailyLevel/>
    <PendingSubmission/>
</main>

<style lang='scss'>
    iframe{
        float: left;
        border: 1px solid var(--line);
        border-radius: 15px;
        margin-bottom: 30px;
        margin-right: 30px;
    }
    main{
        display: inline-block;
    }
    @media screen and (max-width: 1000px) {
        iframe{
            width: 100%;
        }
    }
</style>