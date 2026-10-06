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

const totalPoints =
scoreA + scoreB;
 
const winPctA =
teamA.wins /
Math.max(
teamA.wins +
teamA.losses,
1
);
 
const winPctB =
teamB.wins /
Math.max(
teamB.wins +
teamB.losses,
1
);
 
const strengthA =
winPctA * 100 +
teamA.avgPPG * 0.4;
 
const strengthB =
winPctB * 100 +
teamB.avgPPG * 0.4;
 
const strengthDiff =
strengthA - strengthB;
 
const scoreDiff =
scoreA - scoreB;
 
const probabilityA =
Math.max(
5,
Math.min(
95,
50 + 
scoreDiff * 1.5 +
strengthDiff * 0.4
)
);
 
const probabilityB =
100 - probabilityA;
 
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
Week {currentWeek} live matchup tracker.
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
rosterMap.get(game[0].roster_id);
 
const teamB =
rosterMap.get(game[1].roster_id);
 
if (!teamA || !teamB) {
return null;
}
 
const scoreA =
game[0].points ?? 0;
 
const scoreB =
game[1].points ?? 0;
 
const startersA =
game[0].starters ?? [];
 
const startersB =
game[1].starters ?? [];
 
const starterPointsA =
game[0].starters_points ?? [];
 
const starterPointsB =
game[1].starters_points ?? [];

const playedA =
starterPointsA.filter(
(p: number) => p > 0
).length;
 
const playedB =
starterPointsB.filter(
(p: number) => p > 0
).length;
 
const remainingA =
startersA.length - playedA;
 
const remainingB =
startersB.length - playedB;
 
const avgPlayerA =
teamA.avgPPG / Math.max(startersA.length, 1);
 
const avgPlayerB =
teamB.avgPPG / Math.max(startersB.length, 1);

const projectedA =
scoreA + remainingA * avgPlayerA;
 
const projectedB =
scoreB + remainingB * avgPlayerB;

const strengthA =
(teamA.avgPPG * 0.7) +
(teamA.wins * 10);
 
const strengthB =
(teamB.avgPPG * 0.7) +
(teamB.wins * 10);

const projectedWinner =
projectedA >= projectedB
? teamA.team
: teamB.team;

const projectedMargin =
Math.abs(projectedA - projectedB);

const upsetAlert =
(projectedWinner === teamA.team &&
strengthA < strengthB) ||
(projectedWinner === teamB.team &&
strengthB < strengthA);
 
const projectedDiff =
projectedA - projectedB;
 
const strengthDiff =
strengthA - strengthB;
 
const probabilityA =
Math.max(
5,
Math.min(
95,
50 +
projectedDiff * 1.2 +
strengthDiff * 0.3
)
);
 
const probabilityB =
100 - probabilityA;
 
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
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginBottom: "16px",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
fontSize: "20px",
fontWeight: "bold",
}}
>
<span>{teamA.team}</span>
<div>{scoreA.toFixed(2)}</div>
</div>
 
<div
style={{
textAlign: "center",
margin: "12px 0",
color: "#94a3b8",
}}
>
VS
</div>
 
<div
style={{
display: "flex",
justifyContent: "space-between",
fontSize: "20px",
fontWeight: "bold",
}}
>
<span>{teamB.team}</span>
<div>{scoreB.toFixed(2)}</div>
</div>
 
<div
style={{
marginTop: "16px",
color: "#22c55e",
fontWeight: "bold",
}}
>
Leader: {leader}
</div>
 
<div
style={{
marginTop: "12px",
padding: "12px",
background: "#1b2a40",
borderRadius: "8px",
}}
>
<div
style={{
marginBottom: "8px",
fontWeight: "bold",
}}
>
📈 Smart Win Probability
</div>
 
<div>
{teamA.team}: {probabilityA.toFixed(0)}%
</div>
 
<div>
{teamB.team}: {probabilityB.toFixed(0)}%
</div>

<div
style={{
marginTop: "8px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Remaining: {remainingA} - {remainingB}
</div>
 
<div
style={{
marginTop: "8px",
color: "#22c55e",
fontSize: "14px",
fontWeight: "bold",
}}
>
Expected Final:{" "}
{projectedA.toFixed(1)}
{" - "}
{projectedB.toFixed(1)}
</div>

<div
style={{
marginTop: "4px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Projected Winner: {projectedWinner}
<div
style={{
color: "#94a3b8",
fontSize: "12px",
}}
>
Projected Margin: {projectedMargin.toFixed(1)}
</div>
 
{upsetAlert && (
<div
style={{
marginTop: "6px",
color: "#f59e0b",
fontWeight: "bold",
}}
>
🚨 Upset Alert
</div>
)}
 
</div>
</div>
 
<div
style={{
marginTop: "8px",
height: "10px",
background: "#334155",
borderRadius: "999px",
overflow: "hidden",
}}
>
<div
style={{
width: `${probabilityA}%`,
height: "100%",
background: "#22c55e",
}}
/>
</div>
 
<div
style={{
marginTop: "8px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Based on current score, record, and scoring strength.
</div>
</div>
);
})}

</main>
);
}
