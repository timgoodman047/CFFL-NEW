import {
getCurrentWeek,
getTransactions,
getUsers,
getRosters,
getPlayers,
} from "../../lib/sleeper";
 
export default async function TransactionsPage() {
const currentWeek =
await getCurrentWeek();
 
const allTransactions = [];
 
for (let week = 1; week <= currentWeek; week++) {
const weeklyTransactions =
await getTransactions(week);
 
allTransactions.push(...weeklyTransactions);
}
allTransactions.sort(
(a: any, b: any) =>
b.created - a.created
);
 
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
owner?.display_name || "Unknown"
);
});

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
marginBottom: "24px",
}}
>
📋 League Transactions
</h1>
 
{allTransactions.length === 0 ? (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
No transactions found.
</div>
) : (
allTransactions.map(
(
transaction: any
) => {
const creator =
users.find(
(user: any) =>
user.user_id ===
transaction.creator
);
 
if (transaction.type === "trade") {
console.log(
JSON.stringify(
transaction,
null,
2
)
);
}
 
return (
<div
key={
transaction.transaction_id
}
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
marginBottom:
"16px",
}}
>
<h2
style={{
color: "#22c55e",
marginTop: 0,
}}
>
{transaction.type?.toUpperCase()}
</h2>
 
<div
style={{
color: "#94a3b8",
marginBottom: "12px",
}}
>
By{" "}
{creator?.display_name ??
"Unknown"}
</div>
 
{transaction.type === "trade" && (
<div
style={{
marginBottom: "12px",
color: "#facc15",
}}
>
Trade Between:{" "}
{transaction.roster_ids
?.map(
(rosterId: number) =>
rosterMap.get(rosterId)
)
.join(" ↔ ")}
</div>
)}

{transaction.type === "trade" &&
transaction.draft_picks?.length > 0 && (
<div
style={{
marginBottom: "12px",
color: "#94a3b8",
}}
>
<strong>Draft Picks:</strong>
 
{transaction.draft_picks.map(
(pick: any, idx: number) => (
<div key={idx}>
🏈 {pick.season} Round {pick.round}
{" → "}
{rosterMap.get(pick.owner_id)}
</div>
)
)}
</div>
)}

<div
style={{
fontSize: "12px",
color: "#64748b",
}}
>
{new Date(
transaction.created
).toLocaleString()}
</div>
 
<div>
{transaction.adds &&
Object.entries(
transaction.adds
).map(
([playerId, rosterId]) => {
const player =
players[playerId];
 
return (
<div
key={playerId}
style={{
marginBottom: "8px",
}}
>
🟢{" "}
<strong>
{player?.full_name ||
playerId}
</strong>
{" → "}
{rosterMap.get(
Number(rosterId)
)}
</div>
);
}
)}
 
{transaction.type !== "trade" &&
transaction.drops &&
Object.keys(
transaction.drops
).map((playerId) => {
const player =
players[playerId];
 
return (
<div
key={playerId}
style={{
marginBottom: "8px",
}}
>
🔴 Dropped{" "}
<strong>
{player?.full_name ||
playerId}
</strong>
</div>
);
})}
</div>
</div>
);
}
)
)}
</main>
);
}
