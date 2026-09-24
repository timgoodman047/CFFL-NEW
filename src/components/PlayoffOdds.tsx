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
 
const gamesPlayed =
Math.max(
wins + losses,
1
);
 
const ppg =
pf / gamesPlayed;
 
const score =
(wins * 100) +
(pf * 0.5) +
(ppg * 10);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
score
 
};
 
});
 
const totalScore =
teams.reduce(
(sum, t) =>
sum + t.score,
0
);
 
const odds =
teams
.map(team => ({
 
...team,
 
playoffOdds:
(
team.score /
totalScore *
100
)
 
}))
.sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
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
 
{odds.map((team)=>(
 
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
{team.team}
</strong>
 
<br />
 
{team.playoffOdds
.toFixed(1)}%
 
</div>
 
))}
 
</div>
 
);
 
}
