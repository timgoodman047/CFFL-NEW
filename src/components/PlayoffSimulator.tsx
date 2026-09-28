import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const simulations = 5000;
 
const teams = simulationData.map((team) => ({
...team,
championships: 0,
runnersUp: 0,
playoffAppearances: 0,
sackos: 0,
}));
 
for (let sim = 0; sim < simulations; sim++) {
const standings = simulationData
.map((team) => ({
...team,
strength:
team.wins * 10 +
team.pointsFor / 100 +
Math.random() * 40,
}))
.sort(
(a, b) =>
b.strength - a.strength
);
 
standings
.slice(0, 6)
.forEach((team) => {
const target = teams.find(
(t) => t.team === team.team
);
 
if (target) {
target.playoffAppearances++;
}
});
 
const sackoTeam =
standings[standings.length - 1];
 
const sackoTarget = teams.find(
(t) => t.team === sackoTeam.team
);
 
if (sackoTarget) {
sackoTarget.sackos++;
}
 
const seed1 = standings[0];
const seed2 = standings[1];
const seed3 = standings[2];
const seed4 = standings[3];
const seed5 = standings[4];
const seed6 = standings[5];
 
const qf1 =
simulateGame(seed3, seed6);
 
const qf2 =
simulateGame(seed4, seed5);
 
const sf1 =
simulateGame(seed1, qf2);
 
const sf2 =
simulateGame(seed2, qf1);
 
const champion =
simulateGame(sf1, sf2);
 
const runnerUp =
champion.team === sf1.team
? sf2
: sf1;
 
const championTarget =
teams.find(
(t) => t.team === champion.team
);
 
if (championTarget) {
championTarget.championships++;
}
 
const runnerUpTarget =
teams.find(
(t) => t.team === runnerUp.team
);
 
if (runnerUpTarget) {
runnerUpTarget.runnersUp++;
}
}
 
const results = teams.map((team) => ({
...team,
 
championshipOdds: Math.round(
(team.championships /
simulations) *
100
),
 
playoffOdds: Math.round(
(team.playoffAppearances /
simulations) *
100
),
 
runnerUpOdds: Math.round(
(team.runnersUp /
simulations) *
100
),
 
sackoOdds: Math.round(
(team.sackos /
simulations) *
100
),
}));
 
const championshipTable =
[...results].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
const playoffTable =
[...results].sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
);
 
const runnerUpTable =
[...results].sort(
(a, b) =>
b.runnerUpOdds -
a.runnerUpOdds
);
 
const sackoTable =
[...results].sort(
(a, b) =>
b.sackoOdds -
a.sackoOdds
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
🎲 Monte Carlo Simulator V7
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
5,000 playoff bracket simulations.
</div>
 
<h3 style={{ color: "white" }}>
🏆 Championship Odds
</h3>
 
{championshipTable.map((team) => (
<Row
key={`champ-${team.team}`}
label={team.team}
value={`${team.championshipOdds}%`}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
🎯 Playoff Odds
</h3>
 
{playoffTable.map((team) => (
<Row
key={`playoff-${team.team}`}
label={team.team}
value={`${team.playoffOdds}%`}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
🥈 Runner-Up Odds
</h3>
 
{runnerUpTable.map((team) => (
<Row
key={`runner-${team.team}`}
label={team.team}
value={`${team.runnerUpOdds}%`}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
💀 Sacko Odds
</h3>
 
{sackoTable.map((team) => (
<Row
key={`sacko-${team.team}`}
label={team.team}
value={`${team.sackoOdds}%`}
/>
))}
</div>
);
}
 
function simulateGame(
teamA: any,
teamB: any
) {
const scoreA =
teamA.wins * 10 +
teamA.pointsFor / 100 +
Math.random() * 50;
 
const scoreB =
teamB.wins * 10 +
teamB.pointsFor / 100 +
Math.random() * 50;
 
return scoreA >= scoreB
? teamA
: teamB;
}
 
function Row({
label,
value,
}: {
label: string;
value: string;
}) {
return (
<div
style={{
background: "#1b2a40",
padding: "10px",
borderRadius: "8px",
marginBottom: "8px",
display: "flex",
justifyContent: "space-between",
}}
>
<span>{label}</span>
<strong>{value}</strong>
</div>
);
}
