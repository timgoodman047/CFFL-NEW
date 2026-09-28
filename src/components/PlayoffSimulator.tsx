import { getStandingsData } from "../lib/getStandingsData";
 
export default async function PlayoffSimulator() {
const standings = await getStandingsData();
 
const simulations = 5000;
 
const teams = standings.map((team) => ({
...team,
playoffs: 0,
championships: 0,
runnersUp: 0,
sackos: 0,
totalSeed: 0,
totalFinish: 0,
}));
 
for (let sim = 0; sim < simulations; sim++) {
const season = standings
.map((team) => ({
...team,
rating:
team.wins * 12 +
team.pointsFor / 100 +
Math.random() * 50,
}))
.sort((a, b) => b.rating - a.rating);
 
season.forEach((team, index) => {
const target = teams.find(
(t) => t.team === team.team
);
 
if (!target) return;
 
const finish = index + 1;
 
target.totalFinish += finish;
 
if (finish <= 6) {
target.playoffs++;
target.totalSeed += finish;
}
 
if (finish === 10) {
target.sackos++;
}
});
 
const seed1 = season[0];
const seed2 = season[1];
const seed3 = season[2];
const seed4 = season[3];
const seed5 = season[4];
const seed6 = season[5];
 
const qf1 = simulateGame(seed3, seed6);
const qf2 = simulateGame(seed4, seed5);
 
const sf1 = simulateGame(seed1, qf2);
const sf2 = simulateGame(seed2, qf1);
 
const champion = simulateGame(sf1, sf2);
 
const runnerUp =
champion.team === sf1.team
? sf2
: sf1;
 
const champTarget = teams.find(
(t) => t.team === champion.team
);
 
if (champTarget) {
champTarget.championships++;
}
 
const runnerTarget = teams.find(
(t) => t.team === runnerUp.team
);
 
if (runnerTarget) {
runnerTarget.runnersUp++;
}
}
 
const results = teams.map((team) => ({
...team,
 
playoffOdds: Math.round(
(team.playoffs / simulations) * 100
),
 
championshipOdds: Math.round(
(team.championships / simulations) * 100
),
 
runnerUpOdds: Math.round(
(team.runnersUp / simulations) * 100
),
 
sackoOdds: Math.round(
(team.sackos / simulations) * 100
),
 
averageSeed:
team.playoffs > 0
? (
team.totalSeed /
team.playoffs
).toFixed(1)
: "N/A",
 
averageFinish: (
team.totalFinish / simulations
).toFixed(1),
}));
 
const championshipTable = [...results].sort(
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
🎲 Monte Carlo Simulator V9
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
5,000 simulated seasons with playoff
brackets.
</div>
 
{championshipTable.map((team) => (
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>{team.team}</strong>
 
<br />
 
🏆 Championship:
{" "}
{team.championshipOdds}%
 
<br />
 
🥈 Runner-Up:
{" "}
{team.runnerUpOdds}%
 
<br />
 
🎯 Playoffs:
{" "}
{team.playoffOdds}%
 
<br />
 
👑 Avg Seed:
{" "}
{team.averageSeed}
 
<br />
 
📈 Avg Finish:
{" "}
{team.averageFinish}
 
<br />
 
💀 Sacko:
{" "}
{team.sackoOdds}%
</div>
))}
</div>
);
}
 
function simulateGame(
teamA: any,
teamB: any
) {
const scoreA =
teamA.wins * 12 +
teamA.pointsFor / 100 +
Math.random() * 45;
 
const scoreB =
teamB.wins * 12 +
teamB.pointsFor / 100 +
Math.random() * 45;
 
return scoreA >= scoreB
? teamA
: teamB;
}
