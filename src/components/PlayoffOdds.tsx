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
 
const teamStrength =
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
teamStrength
 
};
 
});
 
// ==========================
// PLAYOFF MODEL
// ==========================
 
const strongest =
Math.max(
...teams.map(
t => t.teamStrength
)
);
 
const weakest =
Math.min(
...teams.map(
t => t.teamStrength
)
);
 
const playoffOdds =
teams.map(team => {
 
const normalized =
(
team.teamStrength -
weakest
) /
(
strongest -
weakest ||
1
);
 
const playoff =
20 + (normalized * 75);
 
const championship =
playoff * 0.35;
 
const sacko =
100 - playoff;
 
return {
 
...team,
 
playoffOdds:
Math.min(
playoff,
99
),
 
championshipOdds:
championship,
 
sackoOdds:
sacko
 
};
 
})
.sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
);
 
return (
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px"
}}
>
 
<h2
style={{
color: "#22c55e"
}}
>
🎲 Playoff Odds
</h2>
 
{playoffOdds.map(team => (
 
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "15px",
borderRadius: "10px",
marginBottom: "12px"
}}
>
 
<div
style={{
display: "flex",
justifyContent:
"space-between",
marginBottom: "8px"
}}
>
 
<strong>
{team.team}
</strong>
 
<span
style={{
color: "#22c55e"
}}
>
{team.playoffOdds.toFixed(1)}%
</span>
 
</div>
 
{/* Playoff Bar */}
 
<div
style={{
height: "8px",
borderRadius: "999px",
background: "#08111f",
overflow: "hidden",
marginBottom: "10px"
}}
>
 
<div
style={{
width:
`${team.playoffOdds}%`,
height: "100%",
background:
"#22c55e"
}}
/>
 
</div>
 
<div
style={{
fontSize: "14px",
color: "#d1d5db"
}}
>
 
Championship:
{" "}
{team.championshipOdds.toFixed(1)}%
 
<br />
 
Sacko:
{" "}
{team.sackoOdds.toFixed(1)}%
 
</div>
 
</div>
 
))}
 
</div>
 
);
 
}
