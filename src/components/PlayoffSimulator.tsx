import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const rankedTeams = simulationData
.map((team) => {
const powerScore =
team.wins * 10 +
team.pointsFor / 100;
 
return {
...team,
powerScore,
 
playoffOdds: Math.min(
99,
Math.round(powerScore)
),
 
championshipOdds: Math.max(
1,
Math.round(powerScore * 0.32)
),
 
sackoOdds: Math.max(
1,
Math.round(
(100 - powerScore) * 0.8
)
),
};
})
.sort(
(a, b) =>
b.powerScore - a.powerScore
);
 
const championshipOdds =
[...rankedTeams].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
const sackoOdds =
[...rankedTeams].sort(
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
🎲 Playoff Simulator V3
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
Based on wins and total points scored.
</div>
 
<h3 style={{ color: "white" }}>
🏆 Championship Odds
</h3>
 
{championshipOdds.map((team) => (
<Row
key={`title-${team.team}`}
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
 
{rankedTeams.map((team) => (
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
 
{sackoOdds.map((team) => (
<Row
key={`sacko-${team.team}`}
label={team.team}
value={`${team.sackoOdds}%`}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
📈 Team Power Scores
</h3>
 
{rankedTeams.map((team) => (
<Row
key={`power-${team.team}`}
label={team.team}
value={team.powerScore.toFixed(1)}
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
