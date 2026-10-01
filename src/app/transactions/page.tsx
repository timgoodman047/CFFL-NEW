import {
getCurrentWeek,
getTransactions,
getUsers,
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
 
const users =
await getUsers();

const players =
await getPlayers();
 
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
 
{transactions.length === 0 ? (
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
color:
"#22c55e",
marginTop: 0,
}}
>
{transaction.type?.toUpperCase()}
</h2>
 
<div
style={{
color:
"#94a3b8",
marginBottom:
"12px",
}}
>
By{" "}
{creator?.display_name ??
"Unknown"}
</div>
 
<div>
{transaction.adds &&
Object.keys(
transaction.adds
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
🟢 Added{" "}
<strong>
{player?.full_name ||
playerId}
</strong>
</div>
);
})}
 
{transaction.drops &&
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
