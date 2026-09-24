import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function PowerRankings() {
 
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters.map((r: any) => {
 
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
const pf =
Number(r.settings?.fpts || 0) +
(
Number(
r.settings?.fpts_decimal || 0
) / 100
);
 
const wins =
r.settings?.wins || 0;
 
const losses =
r.settings?.losses || 0;
 
// Custom Ranking Score
const score =
(wins * 100) + pf;
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name,
 
wins,
losses,
pf,
score
 
};
 
});
 
teams.sort(
(a: any, b: any) =>
b.score - a.score
);
 
return (
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px"
}}
>
 
<h2
style={{
color: "#22c55e"
}}
>
📈 Power Rankings
</h2>
 
{teams.map(
(
team: any,
index: number
) => (
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
#{index+1}
{" "}
{team.team}
</strong>
 
<br />
 
Record:
{" "}
{team.wins}-{team.losses}
 
<br />
 
PF:
{" "}
{team.pf.toFixed(2)}
 
</div>
 
)
)}
 
</div>
 
);
 
}
