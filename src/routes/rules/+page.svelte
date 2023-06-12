<script>
    import Title from "../../components/Title.svelte";
    import Badge from "../../components/Player/Badge.svelte";
</script>

<Title value='Rules' />

<main>
    <h2>General</h2>
    <ul>
        <li>If any level or record violate any rule, it will be deleted or rejected.</li>
        <li>If a player violate too many rules in a short time, that player will be banned until any decision by staffs.</li>    
    </ul>
    <h2>Levels</h2>
    <ul>
        <li>Levels must be possible to beat and verified legitimately.</li>
        <li>Levels must not have any secret way or fatal bug.</li>
        <li>If any fatal bug is found, level must be updated in one week.</li>
        <li>Levels must have decently good gameplay. This is determine by staff's opinion.</li>
        <li>Levels must be longer than 10 seconds.</li>
    </ul>
    <h2>Records</h2>
    <ul>
        <li>Only 100% completions are accepted.</li>
        <li>Tools, hacks, fatal bugs, and secret ways are banned.</li>
    </ul>
    <h2>Rating</h2>
    <ul>
        <li>Rating distribution:</li>
        <ul>
            <li><Badge player={{uid: null, rating: 3000}}>Grandmaster >= 3000 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 2500}}>Master >= 2500 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 2000}}>Candidate Master >= 2000 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 1500}}>Expert >= 1500 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 1000}}>S >= 1000 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 800}}>A >= 800 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 600}}>B >= 600 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 400}}>C >= 400 rating</Badge></li>
        </ul>
    </ul>
</main>