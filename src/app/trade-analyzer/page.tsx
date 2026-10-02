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
(trade: any) => (
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
 
{trade.adds &&
Object.entries(
trade.adds
).map(
(
[
playerId,
rosterId,
\]: any
) => {
const player =
players[
playerId
];
 
return (
<div
key={
playerId
}
>
🟢{" "}
{
player?.full_name
}
{" → "}
{rosterMap.get(
Number(
rosterId
)
)}
</div>
);
}
)}
 
{trade.draft_picks?.map(
(
pick: any,
idx: number
) => (
<div
key={idx}
>
🏈{" "}
{
pick.season
}{" "}
Round{" "}
{
pick.round
}
{" → "}
{rosterMap.get(
pick.owner_id
)}
</div>
)
)}
</div>
)
)}
</main>
);
}
