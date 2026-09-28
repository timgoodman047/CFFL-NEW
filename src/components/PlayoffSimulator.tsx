import { simulationData } from "../data/simulationData";
 
export default function PlayoffSimulator() {
const teams = simulationData.map((team) => {
const teamStrength =
team.pointsFor / (team.wins + team.losses);
 
const expectedWins =
(
team.wins +
teamStrength / 20
).toFixed(1);
 
const playoffOdds = Math.min(
99,
Math.round(
team.wins * 8 +
teamStrength * 2
)
);
 
const championshipOdds = Math.max(
1,
Math.round(playoffOdds * 0.3)
);
 
const averageFinish =
Math.max(
1,
Math.min(
10,
Math.round(
11 - playoffOdds / 10
)
)
);
 
const sackoOdds = Math.max(
1,
Math.round(
(100 - playoffOdds) * 0.8
)
);
 
return {
...team,
teamStrength,
expectedWins,
playoffOdds,
championshipOdds,
averageFinish,
sackoOdds,
};
});
 
const championshipTable = [...teams].sort(
(a, b) =>
b.championshipOdds -
a.championshipOdds
);
 
const playoffTable = [...teams].sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
);
 
const sackoTable = [...teams].sort(
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
🎲 Monte Carlo Simulator V4
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
Simulated from wins and points
scored.
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
📈 Expected Wins
</h3>
 
{playoffTable.map((team) => (
<Row
key={`wins-${team.team}`}
label={team.team}
value={team.expectedWins}
/>
))}
 
<h3
style={{
color: "white",
marginTop: "20px",
}}
>
🏅 Average Finish
</h3>
 
{playoffTable.map((team) => (
<Row
key={`finish-${team.team}`}
label={team.team}
value={`${team.averageFinish}`}
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
