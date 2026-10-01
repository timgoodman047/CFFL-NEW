import {
getUsers,
getRosters,
} from "../../lib/sleeper";
 
export default async function PlayoffMachinePage() {
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters
.map((roster: any) => {
const owner = users.find(
(u: any) =>
u.user_id === roster.owner_id
);
 
return {
owner:
owner?.display_name ||
"Unknown",
wins:
roster.settings?.wins || 0,
losses:
roster.settings?.losses || 0,
points:
Number(
roster.settings?.fpts || 0
) +
Number(
roster.settings?.fpts_decimal || 0
) /
100,
};
})
.sort((a: any, b: any) => {
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.points - a.points;
});
 
const playoffTeams = teams.slice(0, 6);
const bubbleTeams = teams.slice(6, 8);
const longShots = teams.slice(8);

const sixthPlacePoints =
playoffTeams[5]?.points || 0;
 
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
🧮 Playoff Machine
</h1>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginBottom: "20px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
Current Playoff Seeds
</h2>
 
<h2
style={{
color: "#22c55e",
marginTop: "0",
}}
>
🟢 Current Playoff Teams
</h2>
 
{playoffTeams.map(
(
team: any,
index: number
) => (
<div
key={team.owner}
style={{
marginBottom: "8px",
fontWeight: "bold",
}}
>
{index + 1}. {team.owner}
{" "}
({team.wins}-{team.losses})
</div>
)
)}
 
<br />
 
<h2
style={{
color: "#facc15",
}}
>
🟡 First Teams Out
</h2>
 
{bubbleTeams.map(
(team: any) => (
<div
key={team.owner}
style={{
marginBottom: "8px",
}}
>
{team.owner}
{" "}
({team.wins}-{team.losses})
 
{" • "}
 
{Math.max(
0,
sixthPlacePoints -
team.points
).toFixed(2)}
 
{" pts behind 6th"}
</div>
)
)}
 
<br />
 
<h2
style={{
color: "#ef4444",
}}
>
🔴 Long Shots
</h2>
 
{longShots.map(
(team: any) => (
<div
key={team.owner}
style={{
marginBottom: "8px",
}}
>
{team.owner}
{" "}
({team.wins}-{team.losses})
 
{" • "}
 
{Math.max(
0,
sixthPlacePoints -
team.points
).toFixed(2)}
 
{" pts behind 6th"}
</div>
)
)}
</div>
</main>
);
}
