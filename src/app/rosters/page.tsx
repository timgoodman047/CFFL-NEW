import {
getRosters,
getUsers,
getPlayers,
} from "../../lib/sleeper";
 
export default async function RostersPage() {
const rosters =
await getRosters();
 
const users =
await getUsers();
 
const players =
await getPlayers();
 
return (
<main
style={{
maxWidth: "1600px",
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
🏈 League Rosters
</h1>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",
gap: "20px",
}}
>
{rosters.map(
(roster: any) => {
const owner =
users.find(
(user: any) =>
user.user_id ===
roster.owner_id
);
 
const teamName =
owner?.metadata
?.team_name ||
owner?.display_name ||
"Unknown";
 
return (
<div
key={
roster.roster_id
}
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h2
style={{
color:
"#22c55e",
marginTop: 0,
marginBottom:
"4px",
}}
>
{teamName}
</h2>
 
<div
style={{
color:
"#94a3b8",
marginBottom:
"16px",
}}
>
{
owner?.display_name
}
</div>
 
{(
roster.players ||
[]
).map(
(
playerId: string
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
style={{
background:
"#1b2a40",
padding:
"8px",
borderRadius:
"6px",
marginBottom:
"6px",
}}
>
<strong>
{player?.full_name ||
playerId}
</strong>
 
<div
style={{
color:
"#94a3b8",
fontSize:
"12px",
}}
>
{
player?.position
}{" "}
•{" "}
{
player?.team
}
</div>
</div>
);
}
)}
</div>
);
}
)}
</div>
</main>
);
}
