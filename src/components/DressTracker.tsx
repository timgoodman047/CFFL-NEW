import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function DressTracker() {
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
 
losses:
r.settings?.losses || 0,
 
pf:
Number(
r.settings?.fpts || 0
)
};
 
})
.sort((a: any, b: any) => {
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.pf - a.pf;
})
.slice(-3)
.reverse();
 
return (
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
<h2
style={{
color:"#22c55e"
}}
>
👗 Dress Tracker™
</h2>
 
{teams.map(
(
team:any,
index:number
) => (
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px"
}}
>
{index+1}.
{" "}
{team.team}
</div>
 
)
)}
 
</div>
);
}
