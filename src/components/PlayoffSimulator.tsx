import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const simulations = 1000;
 
const results = simulationData.map((team) => {
let playoffCount = 0;
let championshipCount = 0;
let sackoCount = 0;
 
for (let i = 0; i < simulations; i++) {
const score =
team.wins * 10 +
team.pointsFor / 100 +
Math.random() * 40;
 
if (score > 85) {
playoffCount++;
}
 
if (score > 110) {
championshipCount++;
}
 
if (score < 55) {
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
};
});
 
const playoffTable = [...results].sort(
(a, b) => b.playoffOdds - a.playoffOdds
);
 
const championshipTable = [...results].sort(
(a, b) =>
b.championshipOdds - a.championshipOdds
);
 
const sackoTable = [...results].sort(
(a, b) => b.sackoOdds - a.sackoOdds
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
🎲 Monte Carlo Simulator V5
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
1,000 simulated seasons.
</div>
 
<h3
style={{
color: "white",
}}
>
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
