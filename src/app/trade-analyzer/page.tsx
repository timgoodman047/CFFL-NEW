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

function getVerdict(diff: number) {
if (diff >= 100) {
return "🔥 Highway Robbery";
}
 
if (diff >= 50) {
return "📈 Clear Win";
}
 
if (diff >= 20) {
return "✅ Slight Edge";
}
 
return "🤝 Fair Trade";
}

const playerValues: Record<string, number> = {
"Ja'Marr Chase": 100,
"Justin Jefferson": 100,
"CeeDee Lamb": 95,
"Nico Collins": 80,
"Puka Nacua": 85,
"Davante Adams": 55,
"Cade Otton": 30,
};

function getAssetValue(asset: string) {
if (asset.includes("Round 1")) return 90;
if (asset.includes("Round 2")) return 60;
if (asset.includes("Round 3")) return 30;
if (asset.includes("Round 4")) return 15;
 
return playerValues[asset] || 10;
}

function evaluateTrade(
receivedAssets: Record<string, string[]>
) {
const totals: Record<string, number> = {};
 
Object.entries(receivedAssets).forEach(
([owner, assets]) => {
let score = 0;
 
assets.forEach((asset) => {
score += getAssetValue(asset);
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
background: "#13233d",
border: "1px solid #1e3a5f",
boxShadow:
"0 4px 12px rgba(0,0,0,.25)",
padding: "20px",
borderRadius:
"12px",
marginBottom:
"20px",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "12px",
}}
>
<h2
style={{
margin: 0,
color: "#f8fafc",
}}
>
🤝 {trade.roster_ids
?.map((rosterId: number) =>
rosterMap.get(rosterId)
)
.join(" ↔ ")}
</h2>
 
<div
style={{
color: "#94a3b8",
fontSize: "14px",
}}
>
{new Date(trade.created).toLocaleDateString()}
</div>
</div>
 
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
<div
style={{
color: "#38bdf8",
fontWeight: "bold",
marginBottom: "8px",
fontSize: "18px",
}}
>
📥 {owner} Received
</div>
 
{assets.map(
(
asset: string,
idx: number
) => (
<div key={idx}>
• {asset}
{" "}
<span
style={{
color: "#94a3b8",
fontSize: "12px",
}}
>
({getAssetValue(asset)})
</span>
</div>
)
)}
</div>
)
)}

{result && (
<div
style={{
marginTop: "20px",
padding: "16px",
background: "#0f172a",
borderRadius: "10px",
border: "1px solid #1e293b",
}}
>
<div
style={{
fontSize: "18px",
fontWeight: "bold",
marginBottom: "12px",
}}
>
📊 Trade Analysis
</div>
 
<div
style={{
color: "#22c55e",
fontWeight: "bold",
marginBottom: "8px",
}}
>
✅ Winner: {result.winner}
</div>
 
<div
style={{
color: "#ef4444",
marginBottom: "12px",
}}
>
❌ Loser: {result.loser}
</div>
 
<div>
Winner Value: {result.winnerPoints}
</div>
 
<div>
Loser Value: {result.loserPoints}
</div>
 
<div
style={{
marginTop: "10px",
color: "#38bdf8",
fontWeight: "bold",
}}
>
{getVerdict(result.diff)}
</div>
 
<div
style={{
marginTop: "12px",
display: "inline-block",
padding: "6px 12px",
borderRadius: "999px",
background: "#1e293b",
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
