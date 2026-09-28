const playoffOdds = [
{
team: "Nick",
playoff: 96,
title: 28,
},
{
team: "Chris",
playoff: 92,
title: 24,
},
{
team: "Spencer",
playoff: 88,
title: 19,
},
{
team: "Tim",
playoff: 71,
title: 11,
},
{
team: "Brian",
playoff: 65,
title: 10,
},
];
 
const sackoOdds = [
{
team: "Matt",
sacko: 45,
},
{
team: "Jeff",
sacko: 22,
},
{
team: "Tom",
sacko: 17,
},
{
team: "Danny",
sacko: 10,
},
{
team: "Jason",
sacko: 6,
},
];
 
export default function PlayoffSimulator() {
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
🎲 Playoff Simulator
</h2>
 
<h3 style={{ color: "white" }}>
🏆 Championship Odds
</h3>
 
{playoffOdds.map((team) => (
<Row
key={team.team}
label={team.team}
value={`${team.title}%`}
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
 
{playoffOdds.map((team) => (
<Row
key={`${team.team}-playoff`}
label={team.team}
value={`${team.playoff}%`}
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
key={team.team}
label={team.team}
value={`${team.sacko}%`}
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
