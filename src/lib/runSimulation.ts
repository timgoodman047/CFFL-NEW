import { simulateGame }
from "./simulateGame";
 
export function runSimulation(
teams: any[]
) {
const simulatedTeams =
teams.map((team) => ({
...team,
simWins: team.wins,
simLosses: team.losses,
}));
 
for (
let i = 0;
i < simulatedTeams.length;
i++
) {
for (
let j = i + 1;
j < simulatedTeams.length;
j++
) {
const result =
simulateGame(
simulatedTeams[i].avgPPG,
simulatedTeams[j].avgPPG
);
 
if (
result.winner === "A"
) {
simulatedTeams[i].simWins++;
simulatedTeams[j].simLosses++;
} else {
simulatedTeams[j].simWins++;
simulatedTeams[i].simLosses++;
}
}
}
 
return simulatedTeams.sort(
(a, b) =>
b.simWins - a.simWins
);
}
