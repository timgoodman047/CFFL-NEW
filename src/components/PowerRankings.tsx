import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
const previousRankings: Record<string, number> = {
"The Locked Room": 3,
"Fuck You FantasyFootball": 1,
"Red Kingdom": 4,
"Dirty Mike": 2,
"WHO DEY": 6,
"Orangeman": 7,
"Bills Mafia": 8,
"Scheduled dress year": 9,
};
 
export default async function PowerRankings() {
 
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
 
const avgPPG =
pf / games;
 
const rankingScore =
(wins * 100) +
(pf * 0.5) +
(avgPPG * 10);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins,
losses,
pf,
avgPPG,
rankingScore
 
};
 
});
 
teams.sort(
(a: any, b: any) =>
b.rankingScore - a.rankingScore
);
 
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
📈 Power Rankings
</h2>
 
{teams.map(
(
team: any,
index: number
) => {
 
const previous =
previousRankings[
team.team
];
 
let movement = "—";
let movementColor = "#94a3b8";
 
if (
previous &&
previous > index + 1
) {
movement = "▲";
movementColor = "#22c55e";
}
 
if (
previous &&
previous < index + 1
) {
movement = "▼";
movementColor = "#ef4444";
}
 
return (
 
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
 
<div
style={{
display: "flex",
justifyContent:
"space-between",
alignItems:
"center",
}}
>
 
<strong>
 
#{index + 1}
 
{" "}
 
{team.team}
 
</strong>
 
<span
style={{
color:
movementColor,
fontWeight:
"bold",
fontSize:
"18px",
}}
>
{movement}
</span>
 
</div>
 
<div
style={{
marginTop: "8px",
fontSize: "14px",
}}
>
 
Record:
{" "}
{team.wins}
-
{team.losses}
 
<br />
 
PF:
{" "}
{team.pf.toFixed(2)}
 
<br />
 
Avg PPG:
{" "}
{team.avgPPG.toFixed(1)}
 
<br />
 
Score:
{" "}
{team.rankingScore.toFixed(1)}
 
</div>
 
</div>
 
);
 
}
)}
 
</div>
 
);
 
}
