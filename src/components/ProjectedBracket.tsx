import { getLeagueTeams } from "../lib/sleeper";
import { getRemainingMatchups } from "../lib/getRemainingMatchups";
import { runSimulation } from "../lib/runSimulation";
 
export default async function ProjectedBracket() {
const teams =
await getLeagueTeams();
 
const remainingWeeks =
await getRemainingMatchups();
 
const simulations = 5000;
 
const results = teams.map(
(team) => ({
team: team.team,
totalFinish: 0,
})
);
 
for (
let sim = 0;
sim < simulations;
sim++
) {
const simulatedSeason =
await runSimulation(
teams,
remainingWeeks
);
 
simulatedSeason.forEach(
(team, index) => {
const target =
results.find(
(r) =>
r.team === team.team
);
 
if (!target) return;
 
target.totalFinish +=
index + 1;
}
);
}
 
const projectedSeeds =
results
.map((team) => ({
team: team.team,
averageFinish:
team.totalFinish /
simulations,
}))
.sort(
(a, b) =>
a.averageFinish -
b.averageFinish
)
.slice(0, 6);
 
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
marginBottom: "20px",
}}
>
🏟️ Projected Playoff Bracket
</h2>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "12px",
}}
>
#1 {projectedSeeds[0]?.team}
<br />
#2 {projectedSeeds[1]?.team}
<br />
<span
style={{
color: "#94a3b8",
}}
>
First-Round Byes
</span>
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "12px",
}}
>
#3 {projectedSeeds[2]?.team}
<br />
vs
<br />
#6 {projectedSeeds[5]?.team}
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
#4 {projectedSeeds[3]?.team}
<br />
vs
<br />
#5 {projectedSeeds[4]?.team}
</div>
</div>
);
}
