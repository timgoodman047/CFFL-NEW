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
 
const highestPlayoffScores = [...franchises].sort(
(a, b) =>
b.highestPlayoffScore - a.highestPlayoffScore
);
 
const earnings = [...franchises].sort(
(a, b) =>
parseFloat(
String(b.moneyWon).replace("$", "")
) -
parseFloat(
String(a.moneyWon).replace("$", "")
)
);
 
const dynastyRankings = [...franchises]
.map((f) => ({
...f,
dynastyScore:
f.championships * 300 +
f.playoffTrips * 20 +
f.winningPct * 100,
}))
.sort(
(a, b) => b.dynastyScore - a.dynastyScore
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
rows={championships}
valueRenderer={(f) => f.championships}
/>
 
<Leaderboard
title="🎯 Playoff Trips"
rows={playoffTrips}
valueRenderer={(f) => f.playoffTrips}
/>
 
<Leaderboard
title="📈 Winning Percentage"
rows={winningPct}
valueRenderer={(f) =>
`${(f.winningPct * 100).toFixed(1)}%`
}
/>
 
<Leaderboard
title="🔥 Highest Weekly Score"
rows={highestScores}
valueRenderer={(f) => f.highestScore}
/>
 
<Leaderboard
title="🔥 Highest Playoff Score"
rows={highestPlayoffScores}
valueRenderer={(f) =>
f.highestPlayoffScore
}
/>
 
<Leaderboard
title="💰 Career Earnings"
rows={earnings}
valueRenderer={(f) => f.moneyWon}
/>
 
<Leaderboard
title="👑 Dynasty Rankings"
rows={dynastyRankings}
valueRenderer={(f) =>
Math.round(f.dynastyScore)
}
/>
</main>
);
}
 
function Leaderboard({
title,
rows,
valueRenderer,
}: {
title: string;
rows: any[];
valueRenderer: (row: any) => string | number;
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
#{index + 1} {row.owner}
</div>
 
<div>{valueRenderer(row)}</div>
</div>
))}
</div>
);
}
