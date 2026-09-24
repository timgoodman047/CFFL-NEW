import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
function simulateGame(teamA: any, teamB: any) {
const total =
teamA.strength + teamB.strength;
 
const teamAChance =
teamA.strength / total;
 
return Math.random() < teamAChance;
}
 
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
 
const strength =
(wins * 100) +
(ppg * 15);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name,
 
wins,
losses,
pf,
ppg,
strength,
 
playoffCount: 0,
championshipCount: 0,
sackoCount: 0,
totalSeed: 0
 
};
 
});
 
const SIMULATIONS = 5000;
 
for (
let sim = 0;
sim < SIMULATIONS;
sim++
) {
 
const simTeams =
teams.map(t => ({
...t,
simWins: t.wins
}));
 
// Remaining schedule estimate
const remainingWeeks =
Math.max(
14 -
(
teams[0].wins +
teams[0].losses
),
1
);
 
for (
let week = 0;
week < remainingWeeks;
week++
) {
 
const shuffled =
[...simTeams]
.sort(
() =>
Math.random() - 0.5
);
 
for (
let i = 0;
i < shuffled.length;
i += 2
) {
 
const teamA =
shuffled[i];
 
const teamB =
shuffled[i + 1];
 
if (!teamA || !teamB)
continue;
 
const aWins =
simulateGame(
teamA,
teamB
);
 
if (aWins) {
teamA.simWins++;
}
else {
teamB.simWins++;
}
}
}
 
const standings =
[...simTeams]
.sort((a, b) => {
 
if (
b.simWins !==
a.simWins
) {
return (
b.simWins -
a.simWins
);
}
 
return (
b.pf -
a.pf
);
 
});
 
standings.forEach(
(
team,
index
) => {
 
const real =
teams.find(
t =>
t.team ===
team.team
);
 
if (!real) return;
 
const seed =
index + 1;
 
real.totalSeed +=
seed;
 
if (seed <= 6) {
real.playoffCount++;
}
 
if (seed === 1) {
real.championshipCount++;
}
 
if (seed === 10) {
real.sackoCount++;
}
 
}
);
 
}
 
const results =
teams
.map(team => ({
 
...team,
 
playoffOdds:
(
team.playoffCount /
SIMULATIONS
) * 100,
 
championshipOdds:
(
team.championshipCount /
SIMULATIONS
) * 100,
 
sackoOdds:
(
team.sackoCount /
SIMULATIONS
) * 100,
 
averageSeed:
(
team.totalSeed /
SIMULATIONS
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
 
{results.map(team => (
 
<div
key={team.team}
style={{
background:"#1b2a40",
padding:"14px",
borderRadius:"10px",
marginBottom:"12px"
}}
>
 
<strong>
{team.team}
</strong>
 
<br />
 
Playoffs:
{" "}
{team.playoffOdds.toFixed(1)}%
 
<br />
 
Championship:
{" "}
{team.championshipOdds.toFixed(1)}%
 
<br />
 
Sacko:
{" "}
{team.sackoOdds.toFixed(1)}%
 
<br />
 
Avg Seed:
{" "}
{team.averageSeed.toFixed(1)}
 
</div>
 
))}
 
</div>
 
);
}
