import { simulateGame } from "./simulateGame";
 
export async function runSimulation(
teams: any[],
remainingWeeks: any[]
) {
const seasonTeams = teams.map(
(team) => ({
...team,
simWins: team.wins,
simLosses: team.losses,
})
);
 
const teamMap = new Map(
seasonTeams.map((team) => [
team.rosterId,
team,
])
);
 
for (const week of remainingWeeks) {
const matchupGroups =
new Map<number, any[]>();
 
for (const matchup of week.matchups) {
const matchupId =
matchup.matchup_id;
 
if (
!matchupGroups.has(matchupId)
) {
matchupGroups.set(
matchupId,
[]
);
}
 
matchupGroups
.get(matchupId)!
.push(matchup);
}
 
for (const pair of matchupGroups.values()) {
if (pair.length !== 2)
continue;
 
const teamA =
teamMap.get(
pair[0].roster_id
);
 
const teamB =
teamMap.get(
pair[1].roster_id
);
 
if (!teamA || !teamB)
continue;
 
const result =
simulateGame(
teamA.avgPPG,
teamB.avgPPG
);
 
if (
result.winner === "A"
) {
teamA.simWins++;
teamB.simLosses++;
} else {
teamB.simWins++;
teamA.simLosses++;
}
}
}
 
return seasonTeams.sort(
(a, b) => {
if (
b.simWins !==
a.simWins
) {
return (
b.simWins -
a.simWins
);
}
 
return b.pf - a.pf;
}
);
}
