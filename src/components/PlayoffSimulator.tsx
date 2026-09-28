import { getStandingsData } from "../lib/getStandingsData";
 
export default async function PlayoffSimulator() {
const standings =
await getStandingsData();
 
const simulations = 5000;
 
const results = standings.map(
(team) => {
let playoffCount = 0;
let championCount = 0;
let runnerUpCount = 0;
let sackoCount = 0;
 
for (
let i = 0;
i < simulations;
i++
) {
const score =
team.wins * 12 +
team.pointsFor / 100 +
Math.random() * 50;
 
if (score > 100) {
playoffCount++;
}
 
if (score > 125) {
championCount++;
}
 
if (
score > 115 &&
score <= 125
) {
runnerUpCount++;
}
 
if (score < 60) {
sackoCount++;
}
}
 
return {
...team,
 
playoffOdds: Math.round(
(playoffCount /
simulations) *
100
),
 
championshipOdds:
Math.round(
(championCount /
simulations) *
100
),
 
runnerUpOdds:
Math.round(
(runnerUpCount /
simulations) *
100
),
 
sackoOdds: Math.round(
(sackoCount /
simulations) *
100
),
};
}
);
 
const championshipTable =
[...results].sort(
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
🎲 Monte Carlo Simulator V8
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
Live Sleeper standings +
5,000 simulations.
</div>
 
{championshipTable.map(
(team) => (
<div
key={team.team}
style={{
background:
"#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom:
"10px",
}}
>
<strong>
{team.team}
</strong>
 
<br />
 
🏆 Championship:
{" "}
{
team.championshipOdds
}
%
 
<br />
 
🎯 Playoffs:
{" "}
{
team.playoffOdds
}
%
 
<br />
 
🥈 Runner-Up:
{" "}
{
team.runnerUpOdds
}
%
 
<br />
 
💀 Sacko:
{" "}
{team.sackoOdds}
%
</div>
)
)}
</div>
);
}
