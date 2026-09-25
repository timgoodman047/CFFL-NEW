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
 
// League leader
 
const leader =
[...teams]
.sort((a, b) => {
 
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.pf - a.pf;
 
})[0];
 
// Highest scoring team
 
const highestPF =
[...teams]
.sort(
(a, b) =>
b.pf - a.pf
)[0];
 
// Sacko favorite
 
const sacko =
[...teams]
.sort(
(a, b) =>
a.pf - b.pf
)[0];
 
// Playoff bubble
 
const bubble =
[...teams]
.sort((a, b) => {
 
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
 
return b.pf - a.pf;
 
})[5];
 
const headline =
`${leader.team} continues to control the league race while ${sacko.team} remains stuck on Sacko Watch.`;
 
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
📰 League News Network
</h2>
 
{/* Headline */}
 
<div
style={{
background: "#1b2a40",
padding: "15px",
borderRadius: "10px",
marginBottom: "12px",
lineHeight: "1.6",
}}
>
 
<strong>
Headline
</strong>
 
<br /><br />
 
{headline}
 
</div>
 
{/* League Leader */}
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "10px",
marginBottom: "10px",
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
 
{/* Highest PF */}
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "10px",
marginBottom: "10px",
}}
>
 
<strong>
🔥 Highest Scoring Team
</strong>
 
<br />
 
{highestPF.team}
 
<br />
 
PF:
{" "}
{highestPF.pf.toFixed(2)}
 
</div>
 
{/* Bubble Team */}
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "10px",
marginBottom: "10px",
}}
>
 
<strong>
📈 Playoff Bubble
</strong>
 
<br />
 
{bubble?.team || "TBD"}
 
</div>
 
{/* Sacko Watch */}
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "10px",
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
