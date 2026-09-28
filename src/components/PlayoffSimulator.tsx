import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const rankedTeams = [...simulationData]
.sort(
(a, b) =>
b.powerRating - a.powerRating
)
.map((team) => ({
...team,
 
playoffOdds: Math.min(
99,
Math.round(
team.powerRating * 1.05
)
),
 
championshipOdds: Math.max(
1,
Math.round(
team.powerRating * 0.3
)
),
 
sackoOdds: Math.max(
1,
Math.round(
(100 - team.powerRating) * 0.8
)
),
}));
 
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
🎲 Playoff Simulator V2
</h2>
 
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
