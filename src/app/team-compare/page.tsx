"use client";
 
import { useState } from "react";
import { franchises } from "@/data/franchises";
 
export default function TeamComparePage() {
const [teamA, setTeamA] = useState(
franchises[0].owner
);
 
const [teamB, setTeamB] = useState(
franchises[1].owner
);
 
const franchiseA = franchises.find(
(f) => f.owner === teamA
);
 
const franchiseB = franchises.find(
(f) => f.owner === teamB
);
 
if (!franchiseA || !franchiseB) {
return null;
}
 
return (
<main
style={{
maxWidth: "1200px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
marginBottom: "20px",
}}
>
⚔️ Franchise Comparison
</h1>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "16px",
marginBottom: "30px",
}}
>
<div>
<label
style={{
display: "block",
marginBottom: "8px",
}}
>
Franchise A
</label>
 
<select
value={teamA}
onChange={(e) =>
setTeamA(
e.target.value
)
}
style={{
width: "100%",
padding: "10px",
borderRadius: "8px",
}}
>
{franchises.map(
(team) => (
<option
key={team.owner}
value={team.owner}
>
{team.owner}
</option>
)
)}
</select>
</div>
 
<div>
<label
style={{
display: "block",
marginBottom: "8px",
}}
>
Franchise B
</label>
 
<select
value={teamB}
onChange={(e) =>
setTeamB(
e.target.value
)
}
style={{
width: "100%",
padding: "10px",
borderRadius: "8px",
}}
>
{franchises.map(
(team) => (
<option
key={team.owner}
value={team.owner}
>
{team.owner}
</option>
)
)}
</select>
</div>
</div>
 
<div
style={{
background: "#111c2d",
borderRadius: "12px",
overflow: "hidden",
}}
>
<div
style={{
display: "grid",
gridTemplateColumns:
"1fr 1fr 1fr",
background:
"#0f172a",
padding: "14px",
fontWeight: "bold",
}}
>
<div>
{franchiseA.owner}
</div>
 
<div
style={{
textAlign: "center",
}}
>
Stat
</div>
 
<div
style={{
textAlign: "right",
}}
>
{franchiseB.owner}
</div>
</div>
 
{[
{
label:
"Overall Record",
a: franchiseA.overallRecord,
b: franchiseB.overallRecord,
},
{
label:
"Winning %",
a: (
franchiseA.winningPct *
100
).toFixed(1),
b: (
franchiseB.winningPct *
100
).toFixed(1),
},
{
label:
"Championships",
a: franchiseA.championships,
b: franchiseB.championships,
},
{
label:
"Playoff Trips",
a: franchiseA.playoffTrips,
b: franchiseB.playoffTrips,
},
{
label:
"Highest Score",
a: franchiseA.highestScore,
b: franchiseB.highestScore,
},
{
label:
"Highest Playoff Score",
a: franchiseA.highestPlayoffScore,
b: franchiseB.highestPlayoffScore,
},
{
label:
"Money Won",
a: franchiseA.moneyWon,
b: franchiseB.moneyWon,
},
{
label:
"Years Active",
a: franchiseA.yearsActive,
b: franchiseB.yearsActive,
},
].map((row) => (
<div
key={row.label}
style={{
display: "grid",
gridTemplateColumns:
"1fr 1fr 1fr",
padding: "14px",
borderTop:
"1px solid #1f2937",
}}
>
<div>{row.a}</div>
 
<div
style={{
textAlign:
"center",
color:
"#94a3b8",
}}
>
{row.label}
</div>
 
<div
style={{
textAlign:
"right",
}}
>
{row.b}
</div>
</div>
))}
</div>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"1fr 1fr",
gap: "20px",
marginTop: "24px",
}}
>
<div
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h3
style={{
color:
"#22c55e",
}}
>
{franchiseA.owner}
</h3>
 
<p>
{franchiseA.notes}
</p>
</div>
 
<div
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h3
style={{
color:
"#22c55e",
}}
>
{franchiseB.owner}
</h3>
 
<p>
{franchiseB.notes}
</p>
</div>
</div>
</main>
);
}
