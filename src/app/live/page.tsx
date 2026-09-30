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
 
const rosterMap = new Map<
  number,
  any
>(
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

const gameSummaries = games
.filter(
(game) => game.length === 2
)
.map((game) => {
const teamA =
rosterMap.get(
game[0].roster_id
) as any;
 
const teamB =
rosterMap.get(
game[1].roster_id
) as any;
 
const scoreA =
game[0].points ?? 0;
 
const scoreB =
game[1].points ?? 0;
 
return {
teamA,
teamB,
scoreA,
scoreB,
margin: Math.abs(
scoreA - scoreB
),
winner:
scoreA >= scoreB
? teamA
: teamB,
};
});
 
const highestScore =
gameSummaries.reduce(
(best, game) => {
const bestScore =
best.scoreA >
best.scoreB
? best.scoreA
: best.scoreB;
 
const currentScore =
game.scoreA >
game.scoreB
? game.scoreA
: game.scoreB;
 
return currentScore >
bestScore
? game
: best;
}
);
 
const closestMatchup =
[...gameSummaries].sort(
(a, b) =>
a.margin - b.margin
)[0];
 
const biggestBlowout =
[...gameSummaries].sort(
(a, b) =>
b.margin - a.margin
)[0];
 
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

<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "16px",
marginBottom: "24px",
}}
>
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
🔥 Highest Score
</div>
 
<div>
{
highestScore.winner
.team
}
</div>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
{Math.max(
highestScore.scoreA,
highestScore.scoreB
).toFixed(2)}
</div>
</div>
 
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
⚔️ Closest Matchup
</div>
 
<div>
{
closestMatchup.teamA
.team
}
</div>
 
<div>
vs
</div>
 
<div>
{
closestMatchup.teamB
.team
}
</div>
 
<div
style={{
marginTop: "8px",
}}
>
Margin:{" "}
{closestMatchup.margin.toFixed(
2
)}
</div>
</div>
 
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
💥 Biggest Blowout
</div>
 
<div>
{
biggestBlowout.winner
.team
}
</div>
 
<div
style={{
marginTop: "8px",
}}
>
Margin:{" "}
{biggestBlowout.margin.toFixed(
2
)}
</div>
</div>
</div>
 
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
