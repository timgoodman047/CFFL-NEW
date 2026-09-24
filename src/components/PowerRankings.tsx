import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function PowerRankings() {
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters
.map((r: any) => {
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
return {
team:
owner?.metadata?.team_name ||
owner?.display_name,
 
wins:
r.settings?.wins || 0,
 
pf:
Number(r.settings?.fpts || 0),
};
})
.sort((a: any, b: any) => {
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.pf - a.pf;
});
 
return (
<Card title="📈 Power Rankings">
{teams.map(
(
team: any,
index: number
) => (
<TeamCard
key={team.team}
>
#{index + 1} {team.team}
</TeamCard>
)
)}
</Card>
);
}
 
function Card({
children,
title,
}: any) {
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
{title}
</h2>
 
{children}
</div>
);
}
 
function TeamCard({
children,
}: any) {
return (
<div
style={{
background: "#1b2a40",
padding: "10px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
{children}
</div>
);
}
