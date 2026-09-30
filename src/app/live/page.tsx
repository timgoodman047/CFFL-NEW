import {
getCurrentWeek,
getMatchups,
getLeagueTeams,
} from "../../lib/sleeper";
 
export default async function LivePage() {
const currentWeek =
await getCurrentWeek();
 
const teams =
await getLeagueTeams();
 
const matchups =
await getMatchups(currentWeek);
 
const rosterMap = new Map(
teams.map((team) => [
team.rosterId,
team,
])
);
 
const matchupGroups =
new Map<number, any[]>();
 
for (const matchup of matchups) {
if (
!matchupGroups.has(
matchup.matchup_id
)
) {
matchupGroups.set(
matchup.matchup_id,
[]
);
}
 
matchupGroups
.get(matchup.matchup_id)!
.push(matchup);
}
 
const games = Array.from(
matchupGroups.values()
);
 
return (
<main
style={{
maxWidth: "1200px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
marginBottom: "8px",
}}
>
📺 Live Game Center
</h1>
 
<p
style={{
color: "#94a3b8",
marginBottom: "24px",
}}
>
Week {currentWeek} live
matchup tracker.
</p>
 
{games.map((game, index) => {
if (game.length !== 2) {
return null;
}
 
const teamA =
rosterMap.get(
game[0].roster_id
);
 
const teamB =
rosterMap.get(
game[1].roster_id
);
 
if (
!teamA ||
!teamB
) {
return null;
}
 
const scoreA =
game[0].points ?? 0;
 
const scoreB =
game[1].points ?? 0;
 
const leader =
scoreA > scoreB
? teamA.team
: scoreB > scoreA
? teamB.team
: "Tied";
 
return (
<div
key={index}
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
marginBottom:
"16px",
}}
>
<div
style={{
display: "flex",
justifyContent:
"space-between",
fontSize: "20px",
fontWeight:
"bold",
}}
>
<span>
{teamA.team}
</span>
 
<span>
{scoreA.toFixed(2)}
</span>
</div>
 
<div
style={{
textAlign:
"center",
margin:
"12px 0",
color:
"#94a3b8",
}}
>
VS
</div>
 
<div
style={{
display: "flex",
justifyContent:
"space-between",
fontSize: "20px",
fontWeight:
"bold",
}}
>
<span>
{teamB.team}
</span>
 
<span>
{scoreB.toFixed(2)}
</span>
</div>
 
<div
style={{
marginTop:
"16px",
color:
"#22c55e",
fontWeight:
"bold",
}}
>
Leader: {leader}
</div>
</div>
);
})}
</main>
);
}
