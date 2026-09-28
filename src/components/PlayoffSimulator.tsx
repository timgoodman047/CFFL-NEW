import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const simulations = 1000;
 
const results = simulationData.map((team) => {
let playoffCount = 0;
let championshipCount = 0;
let sackoCount = 0;
 
let totalFinish = 0;
let totalSeed = 0;
 
for (let i = 0; i < simulations; i++) {
const score =
team.wins * 10 +
team.pointsFor / 100 +
Math.random() * 40;
 
let finish = 10;
 
if (score > 120) {
finish = 1;
} else if (score > 110) {
finish = 2;
} else if (score > 100) {
finish = 3;
} else if (score > 90) {
finish = 4;
} else if (score > 80) {
finish = 5;
} else if (score > 70) {
finish = 6;
} else if (score > 60) {
finish = 7;
} else if (score > 50) {
finish = 8;
} else if (score > 40) {
finish = 9;
}
 
totalFinish += finish;
totalSeed += Math.min(6, finish);
 
if (finish <= 6) {
playoffCount++;
}
 
if (finish === 1) {
championshipCount++;
}
 
if (finish === 10) {
sackoCount++;
}
}
 
return {
...team,
 
playoffOdds: Math.round(
(playoffCount / simulations) * 100
),
 
championshipOdds: Math.round(
(championshipCount / simulations) * 100
),
 
sackoOdds: Math.round(
(sackoCount / simulations) * 100
),
 
averageFinish: (
totalFinish / simulations
).toFixed(1),
 
averageSeed: (
totalSeed / simulations
).toFixed(1),
};
});
 
const championshipTable = [...results].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
const playoffTable = [...results].sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
);
 
const sackoTable = [...results].sort(
(a, b) =>
b.sackoOdds - a.sackoOdds
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
🎲 Monte Carlo Simulator V6
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
1,000 simulated seasons.
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
🏅 Average Seed
</h3>
 
{playoffTable.map((team) => (
<Row
key={`seed-${team.team}`}
label={team.team}
value={team.averageSeed}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
📈 Average Finish
</h3>
 
{playoffTable.map((team) => (
<Row
key={`finish-${team.team}`}
label={team.team}
value={team.averageFinish}
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
