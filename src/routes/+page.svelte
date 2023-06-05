<script>
    import Title from "../components/Title.svelte";
    import { user } from '../stores'
    import PendingSubmission from "../components/PendingSubmission.svelte";
</script>

<svelte:head>
    <title>Challenge List VN</title>
</svelte:head>

<Title value={$user ? `Welcome, ${$user.name}`: `Welcome`}/>
<main>
    <iframe src="https://e.widgetbot.io/channels/725734982638895104/807166886390792252" height="400" width="700" title=''></iframe>
    <PendingSubmission/>    
</main>

<style lang='scss'>
    iframe{
        border: 1px solid var(--line);
        border-radius: 15px;
    }
    main{
        display: flex;
        gap: 30px;
    }
    @media screen and (max-width: 1000px) {
        main{
            flex-direction: column;
        }
        iframe{
            width: 100%;
        }
    }
</style>