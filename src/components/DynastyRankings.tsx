const dynastyRankings = [
 
{
owner:"Danny",
championships:3,
playoffTrips:15,
winningPct:.581
},
 
{
owner:"Tim",
championships:5,
playoffTrips:16,
winningPct:.577
},
 
{
owner:"Tom",
championships:3,
playoffTrips:15,
winningPct:.515
},
 
{
owner:"Brian",
championships:2,
playoffTrips:12,
winningPct:.519
},
 
{
owner:"Nick",
championships:2,
playoffTrips:10,
winningPct:.509
}
 
];
 
export default function DynastyRankings() {
 
const rankings =
dynastyRankings
.map(team => ({
 
...team,
 
score:
team.championships * 100 +
team.playoffTrips * 10 +
team.winningPct * 100
 
}))
.sort(
(a,b)=>
b.score-a.score
);
 
return (
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
<h2
style={{
color:"#22c55e"
}}
>
👑 Dynasty Rankings
</h2>
 
{rankings.map(
(
owner,
index
) => (
 
<div
key={owner.owner}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
 
#{index+1}
 
{" "}
 
{owner.owner}
 
</strong>
 
<br />
 
Championships:
{" "}
{owner.championships}
 
<br />
 
Playoff Trips:
{" "}
{owner.playoffTrips}
 
<br />
 
Win %:
{" "}
{(owner.winningPct * 100)
.toFixed(1)}%
 
</div>
 
)
)}
 
</div>
 
);
 
}
