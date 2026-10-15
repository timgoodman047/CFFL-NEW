import {
getUsers,
getRosters,
LEAGUE_ID,
} from "../lib/sleeper";
 
export default async function Matchups() {
 
const users = await getUsers();
const rosters = await getRosters();
 
const leagueResponse = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}`,
{
cache: "no-store",
}
);
 
const league = await leagueResponse.json();
 
const currentWeek =
league.settings?.leg || 1;
 
const matchupResponse = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/matchups/${currentWeek}`,
{
cache: "no-store",
}
);
 
const matchupData =
await matchupResponse.json();
 
const teams = rosters.map((roster: any) => {
 
const owner = users.find(
(u: any) =>
u.user_id === roster.owner_id
);
 
const wins =
roster.settings?.wins || 0;
 
const losses =
roster.settings?.losses || 0;
 
const pf =
Number(roster.settings?.fpts || 0) +
(
Number(
roster.settings?.fpts_decimal || 0
) / 100
);
 
const gamesPlayed =
Math.max(
wins + losses,
1
);
 
const avgPPG =
pf / gamesPlayed;
 
return {
 
rosterId:
roster.roster_id,
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins,
losses,
pf,
avgPPG
 
};
 
});
 
const matchupGroups: Record<
string,
any[]
> = {};
 
matchupData.forEach(matchup => {
 
if (
!matchupGroups[
matchup.matchup_id
]
) {
 
matchupGroups[
matchup.matchup_id
] = [];
 
}
 
matchupGroups[
matchup.matchup_id
].push(matchup);
 
});
 
const cards =
Object.values(matchupGroups)
.map(group => {
 
if(group.length !== 2)
return null;
 
const teamA =
teams.find(
t =>
t.rosterId ===
group[0].roster_id
);
 
const teamB =
teams.find(
t =>
t.rosterId ===
group[1].roster_id
);
 
if(
!teamA ||
!teamB
)
return null;
 
// Better projection formula
 
const projA =
(
teamA.avgPPG * 0.7 +
(
(
teamA.wins /
Math.max(
teamA.wins +
teamA.losses,
1
)
)
* 100
) *
0.3
);
 
const projB =
(
teamB.avgPPG * 0.7 +
(
(
teamB.wins /
Math.max(
teamB.wins +
teamB.losses,
1
)
)
* 100
) *
0.3
);
 
const total =
projA + projB;
 
const winA =
(
projA /
total *
100
).toFixed(0);
 
const winB =
(
projB /
total *
100
).toFixed(0);
 
const favorite =
projA > projB
? teamA.team
: teamB.team;
 
return {
 
teamA,
teamB,
 
projA:
projA.toFixed(1),
 
projB:
projB.toFixed(1),
 
winA,
winB,
 
favorite,
 
projectedTotal:
projA + projB
 
};
 
})
.filter(Boolean)
.sort(
(a: any, b: any) =>
b.projectedTotal -
a.projectedTotal
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
🎯 Weekly Matchups
</h2>
 
{cards.map(
(
game: any,
index: number
) => (
 
<div
key={index}
style={{
background:"#1b2a40",
padding:"16px",
borderRadius:"12px",
marginBottom:"14px",
border:
index === 0
? "2px solid #22c55e"
: "none"
}}
>
 
{index === 0 && (
 
<div
style={{
color:"#22c55e",
fontWeight:"bold",
marginBottom:"10px"
}}
>
🔥 Game of the Week
</div>
 
)}
 
<strong>
{game.teamA.team}
</strong>
 
<br />
 
Record:
{" "}
{game.teamA.wins}
-
{game.teamA.losses}
 
<br />
 
Projection:
{" "}
{game.projA}
 
<br />
 
Win %
{" "}
{game.winA}%
 
<hr />
 
<div
style={{
textAlign:"center"
}}
>
VS
</div>
 
<hr />
 
<strong>
{game.teamB.team}
</strong>
 
<br />
 
Record:
{" "}
{game.teamB.wins}
-
{game.teamB.losses}
 
<br />
 
Projection:
{" "}
{game.projB}
 
<br />
 
Win %
{" "}
{game.winB}%
 
<hr />
 
Favorite:
{" "}
<span
style={{
color:"#22c55e",
fontWeight:"bold"
}}
>
{game.favorite}
</span>
 
</div>
 
)
)}
 
</div>
 
);
 
}
