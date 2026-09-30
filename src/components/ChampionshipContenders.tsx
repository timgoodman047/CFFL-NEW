import { getLeagueTeams } from "../lib/sleeper";
import { getRemainingMatchups } from "../lib/getRemainingMatchups";
import { runSimulation } from "../lib/runSimulation";
import { simulateGame } from "../lib/simulateGame";
 
function getWinner(teamA: any, teamB: any) {
const result = simulateGame(
teamA,
teamB
);
 
return result.winner === "A"
? teamA
: teamB;
}
 
export default async function ChampionshipContenders() {
const teams =
await getLeagueTeams();
 
const remainingWeeks =
await getRemainingMatchups();
 
const simulations = 5000;
 
const results = teams.map(
(team) => ({
team: team.team,
championships: 0,
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
 
const playoffTeams =
simulatedSeason.slice(0, 6);
 
if (
playoffTeams.length < 6
) {
continue;
}
 
const seed1 =
playoffTeams[0];
const seed2 =
playoffTeams[1];
const seed3 =
playoffTeams[2];
const seed4 =
playoffTeams[3];
const seed5 =
playoffTeams[4];
const seed6 =
playoffTeams[5];
 
const quarter1 =
getWinner(
seed3,
seed6
);
 
const quarter2 =
getWinner(
seed4,
seed5
);
 
const quarter1Seed =
playoffTeams.findIndex(
(t) =>
t.team ===
quarter1.team
) + 1;
 
const quarter2Seed =
playoffTeams.findIndex(
(t) =>
t.team ===
quarter2.team
) + 1;
 
const lowestRemaining =
quarter1Seed >
quarter2Seed
? quarter1
: quarter2;
 
const highestRemaining =
quarter1Seed >
quarter2Seed
? quarter2
: quarter1;
 
const semifinal1 =
getWinner(
seed1,
lowestRemaining
);
 
const semifinal2 =
getWinner(
seed2,
highestRemaining
);
 
const champion =
getWinner(
semifinal1,
semifinal2
);
 
const target =
results.find(
(r) =>
r.team ===
champion.team
);
 
if (target) {
target.championships++;
}
}
 
const contenders =
results
.map((team) => ({
team: team.team,
odds: Number(
(
(team.championships /
simulations) *
100
).toFixed(1)
),
}))
.filter(
(team) =>
team.odds >= 5
)
.sort(
(a, b) =>
b.odds - a.odds
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
🏆 Championship Contenders
</h2>
 
{contenders.map(
(team, index) => (
<div
key={team.team}
style={{
background:
index < 3
? "#1b4332"
: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>
{team.team}
</strong>
 
<div
style={{
color:
"#94a3b8",
marginTop: "4px",
}}
>
Championship Odds:{" "}
{team.odds}%
</div>
</div>
)
)}
</div>
);
}
