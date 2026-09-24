import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function PlayoffOdds() {
 
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
 
const games =
Math.max(
wins + losses,
1
);
 
const ppg =
pf / games;
 
const playoffScore =
(wins * 100) +
(pf * 0.5) +
(ppg * 10);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins,
losses,
pf,
ppg,
playoffScore
 
};
 
});
 
const totalScore =
teams.reduce(
(
total: number,
team: any
) =>
total + team.playoffScore,
0
);
 
const odds =
teams
.map(team => ({
 
...team,
 
playoffOdds:
(
team.playoffScore /
totalScore
) * 100,
 
}))
.sort(
(a: any, b: any) =>
b.playoffOdds - a.playoffOdds
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
🎲 Playoff Odds
</h2>
 
{odds.map((team:any)=>(
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<div
style={{
display:"flex",
justifyContent:"space-between",
fontWeight:"bold"
}}
>
 
<span>
{team.team}
</span>
 
<span
style={{
color:"#22c55e"
}}
>
{team.playoffOdds.toFixed(1)}%
</span>
 
</div>
 
<div
style={{
marginTop:"8px",
width:"100%",
height:"8px",
background:"#0e1624",
borderRadius:"999px"
}}
>
 
<div
style={{
width:
`${team.playoffOdds}%`,
height:"8px",
background:"#22c55e",
borderRadius:"999px"
}}
/>
 
</div>
 
</div>
 
))}
 
</div>
 
);
 
}
