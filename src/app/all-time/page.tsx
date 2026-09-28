import Link from "next/link";
import { franchises } from "../../data/franchises";
 
export default function AllTimePage() {
const championships = [...franchises].sort(
(a, b) => b.championships - a.championships
);
 
const playoffTrips = [...franchises].sort(
(a, b) => b.playoffTrips - a.playoffTrips
);
 
const winningPct = [...franchises].sort(
(a, b) => b.winningPct - a.winningPct
);
 
const highestScores = [...franchises].sort(
(a, b) => b.highestScore - a.highestScore
);
 
return (
<main
style={{
maxWidth: "1400px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
fontSize: "48px",
marginBottom: "8px",
}}
>
🏆 All-Time Records & Leaderboards
</h1>
 
<p
style={{
color: "#94a3b8",
marginBottom: "24px",
}}
>
Career records across league history.
</p>
 
<Leaderboard
title="🏆 Championships"
rows={championships.map((f) => ({
slug: f.slug,
owner: f.owner,
value: f.championships,
}))}
/>
 
<Leaderboard
title="🎯 Playoff Trips"
rows={playoffTrips.map((f) => ({
slug: f.slug,
owner: f.owner,
value: f.playoffTrips,
}))}
/>
 
<Leaderboard
title="📈 Winning Percentage"
rows={winningPct.map((f) => ({
slug: f.slug,
owner: f.owner,
value: `${(f.winningPct * 100).toFixed(1)}%`,
}))}
/>
 
<Leaderboard
title="🔥 Highest Weekly Score"
rows={highestScores.map((f) => ({
slug: f.slug,
owner: f.owner,
value: f.highestScore,
}))}
/>
</main>
);
}
 
function Leaderboard({
title,
rows,
}: {
title: string;
rows: {
slug: string;
owner: string;
value: string | number;
}[];
}) {
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginBottom: "24px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
{title}
</h2>
 
{rows.map((row, index) => (
<div
key={`${row.slug}-${index}`}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
display: "flex",
justifyContent: "space-between",
}}
>
<div>
#{index + 1}{" "}
<Link
href={`/franchise/${row.slug}`}
style={{
color: "#22c55e",
textDecoration ))}
</div>
);
}
