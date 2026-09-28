import { getLeagueTeams } from "../lib/sleeper";
import { getRemainingMatchups } from "../lib/getRemainingMatchups";
import { runSimulation } from "../lib/runSimulation";
 
export default async function ExpectedStandings() {
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
 
if (!target) {
return;
}
 
target.totalFinish +=
index + 1;
}
);
}
 
const standings =
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
marginBottom: "16px",
}}
>
📊 Expected Final Standings
</h2>
 
{standings.map(
(team, index) => (
<div
key={team.team}
style={{
display: "flex",
justifyContent:
"space-between",
padding: "10px 0",
borderBottom:
"1px solid #1f2937",
}}
>
<span>
#{index + 1}{" "}
{team.team}
</span>
 
<strong>
{team.averageFinish.toFixed(
1
)}
</strong>
</div>
)
)}
</div>
);
}
