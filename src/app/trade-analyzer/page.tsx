async function getNFLState() {
const response = await fetch(
"https://api.sleeper.app/v1/state/nfl",
{
cache: "no-store",
}
);
 
return response.json();
}
``

import {
getUsers,
getRosters,
getPlayers,
} from "../../lib/sleeper";
 
const LEAGUE_ID =
"1257014162286989312";
 
async function getTransactions(
week: number
) {
const response = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/transactions/${week}`,
{
cache: "no-store",
}
);
 
return response.json();
}

function getGrade(diff: number) {
if (diff >= 100) return "A+";
if (diff >= 75) return "A";
if (diff >= 50) return "B";
if (diff >= 25) return "C";
if (diff >= 0) return "D";
return "F";
}
 
function evaluateTrade(
receivedAssets: Record<string, string[]>
) {
const totals: Record<string, number> = {};
 
Object.entries(receivedAssets).forEach(
([owner, assets]) => {
let score = 0;
 
assets.forEach((asset) => {
score += 10; // temporary placeholder
});
 
totals[owner] = score;
}
);
 
const ranked = Object.entries(totals).sort(
(a, b) => b[1] - a[1]
);
 
if (ranked.length < 2) return null;
 
return {
winner: ranked[0][0],
loser: ranked[ranked.length - 1][0],
winnerPoints: ranked[0][1],
loserPoints: ranked[ranked.length - 1][1],
diff: ranked[0][1] - ranked[ranked.length - 1][1],
};
}
 
export default async function TradeAnalyzerPage() {
const users =
await getUsers();
 
const rosters =
await getRosters();
 
const players =
await getPlayers();

const nflState = await getNFLState();

<h2 style={{ color: "yellow" }}>
NFL State: {JSON.stringify(nflState)}
</h2>
 
console.log(nflState);
 
const rosterMap = new Map();
 
rosters.forEach((roster: any) => {
const owner = users.find(
(u: any) =>
u.user_id === roster.owner_id
);
 
rosterMap.set(
roster.roster_id,
owner?.display_name ||
"Unknown"
);
});
 
const allTrades = [];
 
for (
let week = 1;
week <= 18;
week++
) {
const transactions =
await getTransactions(
week
);
 
allTrades.push(
...transactions.filter(
(t: any) =>
t.type === "trade"
)
);
}
 
allTrades.sort(
(a: any, b: any) =>
b.created - a.created
);
 
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
}}
>
🤝 Trade Analyzer
</h1>
 
{allTrades.map(
  (trade: any) => {

    const receivedAssets: Record<
      string,
      string[]
    > = {};

if (trade.adds) {
Object.entries(
trade.adds
).forEach(
([playerId, rosterId]) => {
const owner =
rosterMap.get(
Number(rosterId)
);
 
const player =
players[playerId];
 
if (!receivedAssets[owner]) {
receivedAssets[owner] = [];
}
 
receivedAssets[owner].push(
player?.full_name ||
playerId
);
}
);
}

trade.draft_picks?.forEach(
(pick: any) => {
const owner =
rosterMap.get(
pick.owner_id
);
 
if (!receivedAssets[owner]) {
receivedAssets[owner] = [];
}
 
receivedAssets[owner].push(
`${pick.season} Round ${pick.round}`
);
}
);

const result = evaluateTrade(
receivedAssets
);
return (    
  <div
key={
trade.transaction_id
}
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
marginBottom:
"20px",
}}
>
<h2>
Trade Between:
{" "}
{trade.roster_ids
?.map(
(
rosterId: number
) =>
rosterMap.get(
rosterId
)
)
.join(" ↔ ")}
</h2>
 
<div
style={{
color:
"#94a3b8",
marginBottom:
"12px",
}}
>
{new Date(
trade.created
).toLocaleString()}
</div>
 
<h3>
Assets
</h3>
 
{Object.entries(
receivedAssets
).map(
([owner, assets]: any) => (
<div
key={owner}
style={{
marginBottom: "16px",
}}
>
<strong>
{owner} Received
</strong>
 
{assets.map(
(
asset: string,
idx: number
) => (
<div key={idx}>
• {asset}
</div>
)
)}
</div>
)
)}

{result && (
<div
style={{
marginTop: "16px",
padding: "12px",
background: "#0f172a",
borderRadius: "8px",
}}
>
<div
style={{
color: "#22c55e",
fontWeight: "bold",
}}
>
✅ Winner: {result.winner}
</div>
 
<div
style={{
color: "#ef4444",
}}
>
❌ Loser: {result.loser}
</div>
 
<div>
Winner Score: {result.winnerPoints}
</div>
 
<div>
Loser Score: {result.loserPoints}
</div>
 
<div
style={{
marginTop: "8px",
fontWeight: "bold",
}}
>
Grade: {getGrade(result.diff)}
</div>
</div>
)}
</div>
);
})}
 
</main>
);
}
