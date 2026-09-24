import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function News() {
 
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters.map((r: any) => {
 
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
const wins =
r.settings?.wins || 0;
 
const losses =
r.settings?.losses || 0;
 
const pf =
Number(r.settings?.fpts || 0) +
(
Number(
r.settings?.fpts_decimal || 0
) / 100
);
 
return {
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins,
losses,
pf
};
 
});
 
// LEAGUE LEADER
 
const leader =
[...teams]
.sort((a,b)=>{
 
if(b.wins !== a.wins){
return b.wins-a.wins;
}
 
return b.pf-a.pf;
 
})[0];
 
// BIGGEST THREAT
 
const contender =
[...teams]
.sort((a,b)=>b.pf-a.pf)[0];
 
// SACKO FAVORITE
 
const sacko =
[...teams]
.sort((a,b)=>a.pf-b.pf)[0];
 
const headline =
`${leader.team} continues to lead the league while ${sacko.team} remains under heavy Sacko pressure.`;
 
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
📰 League News Network
</h2>
 
<div
style={{
background:"#1b2a40",
padding:"15px",
borderRadius:"10px",
marginBottom:"12px"
}}
>
 
<strong>
Headline
</strong>
 
<br /><br />
 
{headline}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"15px",
borderRadius:"10px",
marginBottom:"12px"
}}
>
 
<strong>
🏆 League Leader
</strong>
 
<br />
 
{leader.team}
 
<br />
 
Record:
{" "}
{leader.wins}-{leader.losses}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"15px",
borderRadius:"10px",
marginBottom:"12px"
}}
>
 
<strong>
🔥 Biggest Threat
</strong>
 
<br />
 
{contender.team}
 
<br />
 
PF:
{" "}
{contender.pf.toFixed(2)}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"15px",
borderRadius:"10px"
}}
>
 
<strong>
👗 Sacko Watch
</strong>
 
<br />
 
{sacko.team}
 
<br />
 
PF:
{" "}
{sacko.pf.toFixed(2)}
 
</div>
 
</div>
 
);
 
}
