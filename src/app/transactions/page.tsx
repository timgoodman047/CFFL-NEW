import {
getCurrentWeek,
getTransactions,
getUsers,
} from "../../lib/sleeper";
 
export default async function TransactionsPage() {
const currentWeek =
await getCurrentWeek();
 
const transactions =
await getTransactions(
currentWeek
);
 
const users =
await getUsers();
 
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
transactions.map(
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
 
<pre
style={{
whiteSpace:
"pre-wrap",
overflowX:
"auto",
color:
"#e5e7eb",
}}
>
{JSON.stringify(
transaction,
null,
2
)}
</pre>
</div>
);
}
)
)}
</main>
);
}
