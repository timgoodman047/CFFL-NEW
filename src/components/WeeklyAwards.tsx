import {
getUsers,
getRosters,
} from "../lib/sleeper";
 
export default async function WeeklyAwards() {
 
const users = await getUsers();
const rosters = await getRosters();
 
const teams = rosters.map((r: any) => {
 
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
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
 
pf,
 
wins:
r.settings?.wins || 0,
 
losses:
r.settings?.losses || 0
 
};
 
});
 
const highestScorer =
[...teams]
.sort(
(a, b) =>
b.pf - a.pf
)[0];
 
const lowestScorer =
[...teams]
.sort(
(a, b) =>
a.pf - b.pf
)[0];
 
const luckiestWin =
[...teams]
.sort((a, b) => {
 
const aRatio =
a.wins /
Math.max(a.pf, 1);
 
const bRatio =
b.wins /
Math.max(b.pf, 1);
 
return bRatio - aRatio;
 
})[0];
 
const toughestLuck =
[...teams]
.sort((a, b) => {
 
const aRatio =
a.pf /
Math.max(a.wins, 1);
 
const bRatio =
b.pf /
Math.max(b.wins, 1);
 
return bRatio - aRatio;
 
})[0];
 
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
🏅 Weekly Awards
</h2>
 
<AwardCard
title="🔥 Highest Scorer"
value={highestScorer.team}
detail={`PF: ${highestScorer.pf.toFixed(2)}`}
/>
 
<AwardCard
title="💀 Sacko Watch"
value={lowestScorer.team}
detail={`PF: ${lowestScorer.pf.toFixed(2)}`}
/>
 
<AwardCard
title="🍀 Luckiest Team"
value={luckiestWin.team}
detail={`${luckiestWin.wins} Wins`}
/>
 
<AwardCard
title="😤 Toughest Luck"
value={toughestLuck.team}
detail={`${toughestLuck.pf.toFixed(2)} PF`}
/>
 
</div>
 
);
 
}
 
function AwardCard({
title,
value,
detail,
}: {
title: string;
value: string;
detail: string;
}) {
 
return (
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "10px",
marginBottom: "10px",
}}
>
 
<strong>
{title}
</strong>
 
<br />
 
{value}
 
<br />
 
<span
style={{
color: "#94a3b8",
fontSize: "14px",
}}
>
{detail}
</span>
 
</div>
 
);
 
}
