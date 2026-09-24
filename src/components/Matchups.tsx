import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function Matchups() {
 
const users =
await getUsers();
 
const rosters =
await getRosters();
 
const teams = rosters.map(
(r:any)=>{
 
const owner =
users.find(
(u:any)=>
u.user_id===r.owner_id
);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name,
 
wins:
r.settings.wins,
 
losses:
r.settings.losses,
 
pf:
Number(r.settings.fpts)
 
};
 
}
);
 
const projections =
teams.slice(0,6);
 
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
🎯 Weekly Matchups
</h2>
 
{projections
.filter(
(_:any,index:number)=>
index % 2 === 0
)
.map(
(
team:any,
index:number
) => {
 
const opponent =
projections[
index*2+1
];
 
if(!opponent)
return null;
 
return (
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"15px",
borderRadius:"10px",
marginBottom:"12px"
}}
>
 
<strong>
{team.team}
</strong>
 
<br />
 
Projection:
{" "}
{(
team.pf /
Math.max(
team.wins+
team.losses,
1
)
).toFixed(1)}
 
<hr />
 
VS
 
<hr />
 
<strong>
{opponent.team}
</strong>
 
</div>
 
);
 
}
)}
 
</div>
 
);
 
}
