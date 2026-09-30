import {
getRosters,
getUsers,
getPlayers,
} from "../../../lib/sleeper";
 
import { franchises } from "../../../data/franchises";
 
export default async function TeamPage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
const { slug } = await params;
const franchise = franchises.find(
(f) => f.slug === slug
);

const users =
await getUsers();
 
const rosters =
await getRosters();
 
const players =
await getPlayers();
 
if (!franchise) {
return (
<main
style={{
padding: "24px",
}}
>
Team not found.
</main>
);
}
 
const owner =
users.find(
(u: any) =>
u.metadata?.team_name ===
franchise.sleeperTeam
);

const roster =
rosters.find(
(r: any) =>
r.owner_id ===
owner?.user_id
);

console.log(
"Franchise Owner:",
franchise.owner
);
 
console.log(
"Matched Sleeper Owner:",
owner?.display_name
);
 
const grouped = {
QB: [] as any[],
RB: [] as any[],
WR: [] as any[],
TE: [] as any[],
K: [] as any[],
DEF: [] as any[],
BENCH: [] as any[],
};
 
(
roster?.players || []
).forEach(
(playerId: string) => {
const player =
players[playerId];
 
if (!player) {
return;
}
 
const pos =
player.position;
 
if (
pos === "QB" ||
pos === "RB" ||
pos === "WR" ||
pos === "TE" ||
pos === "K" ||
pos === "DEF"
) {
grouped[pos].push(
player
);
} else {
grouped.BENCH.push(
player
);
}
}
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
marginBottom: "16px",
}}
>
🏈 {franchise.owner}
</h1>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3,1fr)",
gap: "20px",
marginBottom:
"24px",
}}
>
<div
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h2>
Franchise Profile
</h2>
 
<p>
Record:{" "}
{
franchise.overallRecord
}
</p>
 
<p>
Championships:{" "}
{
franchise.championships
}
</p>
 
<p>
Playoff Trips:{" "}
{
franchise.playoffTrips
}
</p>
 
<p>
Winning %:{" "}
{(
franchise.winningPct *
100
).toFixed(1)}
%
</p>
</div>
 
<div
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h2>
Franchise Success
</h2>
 
<p>
Best Finish:{" "}
{
franchise.bestFinish
}
</p>
 
<p>
Money Won:{" "}
{
franchise.moneyWon
}
</p>
 
<p>
Highest Score:{" "}
{
franchise.highestScore
}
</p>
 
<p>
Highest Playoff
Score:{" "}
{
franchise.highestPlayoffScore
}
</p>
</div>
 
<div
style={{
background:
"#111c2d",
padding: "20px",
borderRadius:
"12px",
}}
>
<h2>
Notes
</h2>
 
<p>
{franchise.notes}
</p>
</div>
</div>
 
<div
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
}}
>
Current Roster
</h2>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3,1fr)",
gap: "20px",
}}
>
{Object.entries(
grouped
).map(
(
[
position,
list,
]
) => {
if (
list.length === 0
) {
return null;
}
 
return (
<div
key={
position
}
>
<h3>
{
position
}
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
background:"#1b2a40",
padding: "8px",
borderRadius:
"8px",
marginBottom:
"6px",
}}
>
{
player.full_name
}
</div>
)
)}
</div>
);
}
)}
</div>
</div>
</main>
);
}
