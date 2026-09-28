import { getLeagueTeams } from "../lib/sleeper";
import { getRemainingMatchups } from "../lib/getRemainingMatchups";
import { runSimulation } from "../lib/runSimulation";
 
export default async function PlayoffSimulator() {
const teams = await getLeagueTeams();
 
const remainingWeeks =
await getRemainingMatchups();
 
const simulations = 10000;
 
const results = teams.map((team) => ({
...team,
championships: 0,
playoffs: 0,
sackos: 0,
totalFinish: 0,
}));
 
for (let sim = 0; sim < simulations; sim++) {
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
 
if (!target) return;
 
const finish =
index + 1;
 
target.totalFinish +=
finish;
 
if (finish <= 6) {
target.playoffs++;
}
 
if (finish === 1) {
target.championships++;
}
 
if (
finish ===
simulatedSeason.length
) {
target.sackos++;
}
}
);
}
 
const finalResults =
results.map((team) => ({
...team,
 
playoffOdds:
Math.round(
(
team.playoffs /
simulations
) * 100
),
 
championshipOdds:
Math.round(
(
team.championships /
simulations
) * 100
),
 
sackoOdds:
Math.round(
(
team.sackos /
simulations
) * 100
),
 
averageFinish:
(
team.totalFinish /
simulations
).toFixed(1),
}));
 
const sorted =
[...finalResults].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
🎲 Monte Carlo Simulator V12
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
1,000 simulations using live
Sleeper standings and remaining
schedule.
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
 
🏆 Championship Odds:
{" "}
{
team.championshipOdds
}
%
 
<br />
 
🎯 Playoff Odds:
{" "}
{team.playoffOdds}
%
 
<br />
 
📈 Average Finish:
{" "}
{
team.averageFinish
}
 
<br />
 
💀 Sacko Odds:
{" "}
{team.sackoOdds}
%
</div>
))}
</div>
);
}
