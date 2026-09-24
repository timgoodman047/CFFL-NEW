import {
getUsers,
getRosters
} from "../lib/sleeper";
 
import {
calculatePowerRankings
} from "../lib/powerRankings";
 
export default async function
PowerRankings() {
 
const users =
await getUsers();
 
const rosters =
await getRosters();
 
const teams =
rosters.map((r:any)=>{
 
const owner =
users.find(
(u:any)=>
u.user_id===r.owner_id
);
 
return {
 
team:
owner?.metadata
?.team_name ||
 
owner
?.display_name,
 
wins:
r.settings.wins,
 
losses:
r.settings.losses,
 
pf:
Number(
r.settings.fpts
) +
(
Number(
r.settings
.fpts_decimal
) / 100
)
 
};
 
});
 
const rankings =
calculatePowerRankings(
teams
);
 
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
📈 Power Rankings
</h2>
 
{rankings.map(
(
team:any,
index:number
)=>(
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"8px"
}}
>
 
<strong>
#{index+1}
{" "}
{team.team}
</strong>
 
<br />
 
Score:
{" "}
{team.score.toFixed(1)}
 
<br />
 
Avg PPG:
{" "}
{team.avgPPG.toFixed(1)}
 
</div>
 
))}
 
</div>
 
);
 
}
