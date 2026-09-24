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
 
return {
 
rosterId:
roster.roster_id,
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins:
roster.settings?.wins || 0,
 
losses:
roster.settings?.losses || 0,
 
pf:
Number(
roster.settings?.fpts || 0
) +
(
Number(
roster.settings?.fpts_decimal || 0
) / 100
)
 
};
 
});
 
const matchupGroups: any = {};
 
matchupData.forEach((matchup: any) => {
 
if (!matchupGroups[matchup.matchup_id]) {
 
matchupGroups[
matchup.matchup_id
] = [];
 
}
 
matchupGroups[
matchup.matchup_id
].push(matchup);
 
});
 
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
🎯 Weekly Matchups
</h2>
 
{Object.values(matchupGroups)
.map((group: any, index) => {
 
if (group.length !== 2)
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
 
if (!teamA || !teamB)
return null;
 
const projA =
(
teamA.pf /
Math.max(
teamA.wins +
teamA.losses,
1
)
).toFixed(1);
 
const projB =
(
teamB.pf /
Math.max(
teamB.wins +
teamB.losses,
1
)
).toFixed(1);
 
const total =
Number(projA) +
Number(projB);
 
const winA =
(
Number(projA) /
total *
100
).toFixed(0);
 
const winB =
(
Number(projB) /
total *
100
).toFixed(0);
 
const favorite =
Number(projA) >
Number(projB)
? teamA.team
: teamB.team;
 
return (
 
<div
key={index}
style={{
background: "#1b2a40",
padding: "15px",
borderRadius: "10px",
marginBottom: "12px",
}}
>
 
<div
style={{
color: "#22c55e",
fontWeight: "bold",
}}
>
{teamA.team}
</div>
 
Projection:
{" "}
{projA}
 
<br />
 
Win Probability:
{" "}
{winA}%
 
<hr />
 
<div
style={{
textAlign: "center",
}}
>
VS
</div>
 
<hr />
 
<div
style={{
color: "#22c55e",
fontWeight: "bold",
}}
>
{teamB.team}
</div>
 
Projection:
{" "}
{projB}
 
<br />
 
Win Probability:
{" "}
{winB}%
 
<hr />
 
Favorite:
{" "}
<strong>
{favorite}
</strong>
 
</div>
 
);
 
})}
 
</div>
 
);
 
}
