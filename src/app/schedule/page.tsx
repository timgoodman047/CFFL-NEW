import {
getMatchups,
getUsers,
getRosters,
getCurrentWeek,
} from "../../lib/sleeper";
 
export default async function SchedulePage() {
const CURRENT_WEEK = await getCurrentWeek();
const TOTAL_WEEKS = 14;
 
const users = await getUsers();
const rosters = await getRosters();
 
const ownerMap = new Map();
const recordMap = new Map();
 
rosters.forEach((roster: any) => {
const owner = users.find(
(u: any) => u.user_id === roster.owner_id
);
 
ownerMap.set(
roster.roster_id,
owner?.display_name || "Unknown"
);
 
recordMap.set(
roster.roster_id,
`${roster.settings?.wins ?? 0}-${roster.settings?.losses ?? 0}`
);
});
 
const weeks = [];
 
for (let week = 1; week <= TOTAL_WEEKS; week++) {
const matchups = await getMatchups(week);
 
const grouped: Record<string, any[]> = {};
 
matchups.forEach((team: any) => {
if (!grouped[team.matchup_id]) {
grouped[team.matchup_id] = [];
}
 
grouped[team.matchup_id].push(team);
});
 
weeks.push({
week,
games: Object.values(grouped),
});
}
 
return (
<div className="space-y-8 p-6">
<h1 className="text-4xl font-bold">
📅 2026 Schedule
</h1>
 
{weeks.map((weekData: any) => (
<div
id={`week-${weekData.week}`}
key={weekData.week}
  
<div
id={`week-${weekData.week}`}
key={weekData.week}
className={`rounded-xl border p-4 ${
weekData.week === CURRENT_WEEK
? "border-green-500 bg-green-950/20"
: ""
}`}
>
<h2 className="mb-4 text-2xl font-bold">
Week {weekData.week}
</h2>

<div className="mb-3 text-sm text-zinc-400">
{weekData.week < CURRENT_WEEK && "✅ Completed"}
{weekData.week === CURRENT_WEEK && "🔥 Current Week"}
{weekData.week > CURRENT_WEEK && "📅 Upcoming"}
</div>

<div className="grid gap-3">
{weekData.games.map(
(game: any, idx: number) => {
if (game.length < 2) return null;
 
const team1 = game[0];
const team2 = game[1];
 
const team1Won =
team1.points > team2.points;
 
return (
<div
key={idx}
className="rounded-lg bg-zinc-900 p-3"
>
<div className="flex justify-between">
<span
style={{
color: team1Won ? "#4ade80" : "white",
fontWeight: team1Won ? "bold" : "normal",
}}
>

{ownerMap.get(team1.roster_id)}
{" "}
({recordMap.get(team1.roster_id)})
- ({team1.points})
</span>
 
<span>vs</span>
 
<span
style={{
color: !team1Won ? "#4ade80" : "white",
fontWeight: !team1Won ? "bold" : "normal",
}}
>

{ownerMap.get(team2.roster_id)}
{" "}
({recordMap.get(team2.roster_id)})
- ({team2.points})
</span>
</div>
</div>
);
}
)}
</div>
</div>
))}
</div>
);
}
