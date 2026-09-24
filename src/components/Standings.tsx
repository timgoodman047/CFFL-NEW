import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function Standings() {
 
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters.map((r: any) => {
 
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
return {
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins:
r.settings?.wins || 0,
 
losses:
r.settings?.losses || 0,
 
pf:
Number(r.settings?.fpts || 0) +
(
Number(
r.settings?.fpts_decimal || 0
) / 100
)
 
};
 
});
 
// ==========
// TOP 5
// RECORD FIRST
// ==========
const topFive =
[...teams]
.sort((a, b) => {
 
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.pf - a.pf;
 
})
.slice(0, 5);
 
// ==========
// BOTTOM 5
// POINTS FOR ONLY
// ==========
const bottomFive =
[...teams]
.filter(
team =>
!topFive.some(
t => t.team === team.team
)
)
.sort(
(a, b) =>
b.pf - a.pf
);
 
const standings = [
...topFive,
...bottomFive
];
 
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
🏆 Live Standings
</h2>
 
{standings.map(
(
team: any,
index: number
) => (
 
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
 
<strong>
#{index + 1} {team.team}
</strong>
 
<br />
 
Record:
{" "}
{team.wins}-{team.losses}
 
<br />
 
PF:
{" "}
{team.pf.toFixed(2)}
 
</div>
 
)
)}
 
</div>
 
);
 
}
