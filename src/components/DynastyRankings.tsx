import { franchises } from "../data/franchises";
 
export default function DynastyRankings() {
const rankings =
franchises
.map((franchise) => {
 
const dynastyScore =
(franchise.championships * 300) +
(franchise.playoffTrips * 20) +
(franchise.winningPct * 100);
 
return {
...franchise,
dynastyScore
};
 
})
.sort(
(a, b) =>
b.dynastyScore -
a.dynastyScore
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
👑 Dynasty Rankings
</h2>
 
{rankings.map(
(
franchise,
index
) => (
 
<div
key={franchise.slug}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>
#{index + 1}
{" "}
{franchise.owner}
</strong>
 
<br />
 
Championships:
{" "}
{franchise.championships}
 
<br />
 
Playoff Trips:
{" "}
{franchise.playoffTrips}
 
<br />
 
Win %:
{" "}
{(franchise.winningPct * 100)
.toFixed(1)}%
 
<br />
 
Dynasty Score:
{" "}
{franchise.dynastyScore
?.toFixed?.(1) ??
(
franchise.championships * 300 +
franchise.playoffTrips * 20 +
franchise.winningPct * 100
).toFixed(1)}
 
</div>
 
)
)}
</div>
);
}
