import { getLeagueTeams } from "../lib/sleeper";
import { getRemainingMatchups } from "../lib/getRemainingMatchups";
import { runSimulation } from "../lib/runSimulation";
import { simulateGame } from "../lib/simulateGame";
 
function getWinner(teamA: any, teamB: any) {
const result = simulateGame(
teamA,
teamB
);
 
return result.winner === "A"
? teamA
: teamB;
}
 
export default async function PlayoffSimulator() {
const teams =
await getLeagueTeams();
 
const remainingWeeks =
await getRemainingMatchups();
 
const simulations = 10000;
 
const results = teams.map(
(team) => ({
...team,
championships: 0,
playoffs: 0,
sackos: 0,
totalFinish: 0,
})
);
 
for (
let sim = 0;
sim < simulations;
sim++
) {
const simulatedSeason =
await runSimulation(
teams,
remainingWeeks
);
 
simulatedSeason.forEach(
(team, index) => {
const target =
results.find(
(r) =>
r.team === team.team
);
 
if (!target) {
return;
}
 
const finish =
index + 1;
 
target.totalFinish +=
finish;
 
if (finish <= 6) {
target.playoffs++;
}
 
if (
finish ===
simulatedSeason.length
) {
target.sackos++;
}
}
);
 
const playoffTeams =
simulatedSeason.slice(0, 6);
 
if (
playoffTeams.length < 6
) {
continue;
}
 
const seed1 =
playoffTeams[0];
const seed2 =
playoffTeams[1];
const seed3 =
playoffTeams[2];
const seed4 =
playoffTeams[3];
const seed5 =
playoffTeams[4];
const seed6 =
playoffTeams[5];
 
const quarter1 =
getWinner(
seed3,
seed6
);
 
const quarter2 =
getWinner(
seed4,
seed5
);
 
const quarter1Seed =
playoffTeams.findIndex(
(t) =>
t.team ===
quarter1.team
) + 1;
 
const quarter2Seed =
playoffTeams.findIndex(
(t) =>
t.team ===
quarter2.team
) + 1;
 
const lowestRemaining =
quarter1Seed >
quarter2Seed
? quarter1
: quarter2;
 
const highestRemaining =
quarter1Seed >
quarter2Seed
? quarter2
: quarter1;
 
const semifinal1 =
getWinner(
seed1,
lowestRemaining
);
 
const semifinal2 =
getWinner(
seed2,
highestRemaining
);
 
const champion =
getWinner(
semifinal1,
semifinal2
);
 
const championRecord =
results.find(
(r) =>
r.team ===
champion.team
);
 
if (
championRecord
) {
championRecord.championships++;
}
}
 
const finalResults =
results.map((team) => ({
...team,
 
playoffOdds: Number(
(
(team.playoffs /
simulations) *
100
).toFixed(1)
),
 
championshipOdds:
Number(
(
(team.championships /
simulations) *
100
).toFixed(1)
),
 
sackoOdds: Number(
(
(team.sackos /
simulations) *
100
).toFixed(1)
),
 
averageFinish: (
team.totalFinish /
simulations
).toFixed(1),
}));
 
const sorted = [
...finalResults,
].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
const favorite = sorted[0];
 
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<div
style={{
background:
"linear-gradient(135deg,#14532d,#166534)",
padding: "18px",
borderRadius: "12px",
marginBottom: "20px",
border:
"1px solid #22c55e",
}}
>
<div
style={{
fontSize: "12px",
color: "#bbf7d0",
textTransform: "uppercase",
letterSpacing: "1px",
marginBottom: "6px",
}}
>
Most Likely Champion
</div>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
color: "white",
}}
>
🏆 {favorite.team}
</div>
 
<div
style={{
marginTop: "10px",
color: "#dcfce7",
lineHeight: "1.8",
}}
>
Championship Odds:{" "}
{favorite.championshipOdds}%
 
<br />
 
Playoff Odds:{" "}
{favorite.playoffOdds}%
 
<br />
 
Average Finish:{" "}
{favorite.averageFinish}
</div>
</div>
 
<h2
style={{
color: "#22c55e",
}}
>
🎲 Monte Carlo Simulator V15
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
10,000 simulations with
projected standings,
playoff qualification,
byes, playoff games,
and championship
brackets.
</div>
 
{sorted.map((team) => (
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>
{team.team}
</strong>
 
<br />
 
🏆 Championship Odds:{" "}
{team.championshipOdds}%
 
<br />
 
🎯 Playoff Odds:{" "}
{team.playoffOdds}%
 
<br />
 
📈 Average Finish:{" "}
{team.averageFinish}
 
<br />
 
💀 Sacko Odds:{" "}
{team.sackoOdds}%
</div>
))}
</div>
);
}
