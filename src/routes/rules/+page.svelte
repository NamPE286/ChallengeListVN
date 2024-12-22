<script>
    import Title from "../../components/Title.svelte";
    import Badge from "../../components/Player/Badge.svelte";
</script>

<Title value='Rules' />

<main>
    <p><i>Effective since 17/6/2023</i></p>
    <h2>General</h2>
    <ul>
        <li>If any level or record violate any rule, it will be deleted or rejected.</li>
        <li>If a player violate too many rules in a short time, that player will be banned until any decision by staffs.</li>    
        <li>Only the players who have Vietnamese citizenship or Vietnamese bloodline can submit challenges & records.</li>
    </ul>
    <h2>Levels</h2>
    <ul>
        <li>Levels must be possible to beat and verified legitimately.</li>
        <li>Levels must not have any secret way or fatal bug.</li>
        <li>If any fatal bug is found, level must be updated in one week.</li>
        <li>Any level with disgusting gameplay (wave spam, 10km straight fly, ...) is not accepted. This is determine by staff's opinion.</li>
        <li>Levels must be longer than 5 seconds.</li>
        <li>Levels must have difficulty of "Insane" or higher (levels don't have to be rated in-game).</li>
        <li>If any accepted level is deleted from GD server, that level will be removed.</li>
        <li>If accepted level's video is deleted, it will be replaced by player's record. If no replacement is avaliable, that level will be removed.</li>
    </ul>
    <h2>Records</h2>
    <ul>
        <li>Only 100% completions are accepted.</li>
        <li>Tools, hacks, fatal bugs, and secret ways are banned.</li>
        <li>Video must have unlisted access or above. Video posted in GDVN or TGGD facebook group is acceptable.</li>
        <li>Video must have decent quality. Recommended 360p and above.</li>
        <li>You must specify video timestamp for each record if you use compilation video for submission.</li>
    </ul>
    <h2>Rating</h2>
    <ul>
        <li>Rating distribution:</li>
        <ul>
            <li><Badge player={{uid: null, rating: 5000}}>Legendary Grandmaster >= 5000 rating</Badge></li>
            <li><Badge player={{uid: null, rating: 3500}}>Grandmaster >= 3500 rating</Badge></li>
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
