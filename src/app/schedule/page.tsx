import { getMatchups, getUsers, getRosters } from "../../lib/sleeper";
 
const CURRENT_WEEK = 5;
const TOTAL_WEEKS = 14;
 
export default async function SchedulePage() {
const users = await getUsers();
const rosters = await getRosters();
 
const ownerMap = new Map();
 
rosters.forEach((roster: any) => {
const owner = users.find(
(u: any) => u.user_id === roster.owner_id
);
 
ownerMap.set(roster.roster_id, owner?.display_name);
});
 
const weeks = [];
 
for (let week = 1; week <= TOTAL_WEEKS; week++) {
const matchups = await getMatchups(week);
 
const grouped = {};
 
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
 
<div className="grid gap-3">
{weekData.games.map((game: any, idx: number) => {
if (game.length < 2) return null;
 
const team1 = game[0];
const team2 = game[1];
 
return (
<div
key={idx}
className="rounded-lg bg-zinc-900 p-3"
>

const team1Won = team1.points > team2.points;

<div className="flex justify-between">
<span
className={
team1Won
? "font-bold text-green-400"
: ""
}
>
{ownerMap.get(team1.roster_id)}
({team1.points})
</span>
 
<span>vs</span>
 
<span
className={
!team1Won
? "font-bold text-green-400"
: ""
}
>
{ownerMap.get(team2.roster_id)}
({team2.points})
</span>
</div>
</div>
);
})}
</div>
</div>
))}
</div>
);
}
