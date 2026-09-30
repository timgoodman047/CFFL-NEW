import Link from "next/link";
import { getTeamSlug } from "../../lib/getTeamSlug";

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
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown";

const slug =
getTeamSlug(teamName);
 
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
color: "#22c55e",
marginTop: 0,
marginBottom: "4px",
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
 
{(() => {
const grouped = {
QB: [] as any[],
RB: [] as any[],
WR: [] as any[],
TE: [] as any[],
K: [] as any[],
DEF: [] as any[],
BENCH: [] as any[],
};
 
(roster.players || []).forEach(
(playerId: string) => {
const player =
players[playerId];
 
if (!player) {
return;
}
 
const position =
player.position;
 
if (
position === "QB" ||
position === "RB" ||
position === "WR" ||
position === "TE" ||
position === "K" ||
position === "DEF"
) {
grouped[position].push(
player
);
} else {
grouped.BENCH.push(
player
);
}
}
);
 
return Object.entries(
grouped
).map(
([position, list]) => {
if (list.length === 0) {
return null;
}
 
return (
<div
key={position}
style={{
marginBottom: "16px",
}}
>
<h3
style={{
color: "#22c55e",
marginBottom: "8px",
}}
>
{position}
</h3>
 
{list.map(
(
player: any
) => (
<div
key={
player.player_id
}
style={{
background:
"#1b2a40",
padding: "8px",
borderRadius:
"6px",
marginBottom:
"6px",
}}
>
<strong>
{
player.full_name
}
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
player.position
}{" "}
•{" "}
{player.team}
</div>
</div>
)
)}
</div>
);
}
);
})()}

</div>
);
}
)}
</div>
</main>
);
}
