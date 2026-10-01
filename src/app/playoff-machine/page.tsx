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
 
{teams.map(
(
team: any,
index: number
) => (
<div
key={team.owner}
style={{
marginBottom: "8px",
}}
>
{index + 1}.{" "}
{team.owner}
{" "}
({team.wins}-
{team.losses})
</div>
)
)}
</div>
</main>
);
}
