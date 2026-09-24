export interface Team {
 
team: string;
 
rosterId: number;
 
wins: number;
 
losses: number;
 
pf: number;
 
avgPPG: number;
 
}
 
export interface SimulationResult {
 
team: string;
 
playoffOdds: number;
 
championshipOdds: number;
 
sackoOdds: number;
 
averageSeed: number;
 
}
 
function calculateStrength(
team: Team
) {
 
return (
 
(team.wins * 100)
 
+
 
(team.pf * 0.5)
 
+
 
(team.avgPPG * 15)
 
);
 
}
 
function simulateGame(
teamA: Team,
teamB: Team
) {
 
const strengthA =
calculateStrength(teamA);
 
const strengthB =
calculateStrength(teamB);
 
const total =
strengthA + strengthB;
 
const oddsA =
strengthA / total;
 
return Math.random() < oddsA;
 
}
 
function buildStandings(
teams: any[]
) {
 
const topFive =
[...teams]
.sort((a, b) => {
 
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
 
})
.slice(0, 5);
 
const bottomFive =
[...teams]
.filter(
team =>
!topFive.some(
t =>
t.team ===
team.team
)
)
.sort(
(a, b) =>
b.pf - a.pf
);
 
return [
...topFive,
...bottomFive
];
 
}
 
function simulatePlayoffs(
standings: any[]
) {
 
const seeds =
standings.slice(0, 6);
 
const seed1 = seeds[0];
const seed2 = seeds[1];
const seed3 = seeds[2];
const seed4 = seeds[3];
const seed5 = seeds[4];
const seed6 = seeds[5];
 
const qf1 =
simulateGame(
seed3,
seed6
)
? seed3
: seed6;
 
const qf2 =
simulateGame(
seed4,
seed5
)
? seed4
: seed5;
 
const sf1 =
simulateGame(
seed1,
qf2
)
? seed1
: qf2;
 
const sf2 =
simulateGame(
seed2,
qf1
)
? seed2
: qf1;
 
const champion =
simulateGame(
sf1,
sf2
)
? sf1
: sf2;
 
return champion.team;
 
}
 
export function runMonteCarloSimulation(
teams: Team[],
simulations = 10000
): SimulationResult[] {
 
const results =
teams.map(
team => ({
 
team:
team.team,
 
playoffs: 0,
 
championships: 0,
 
sackos: 0,
 
seedTotal: 0
 
})
);
 
for (
let sim = 0;
sim < simulations;
sim++
) {
 
const simTeams =
teams.map(
team => ({
 
...team,
 
simWins:
team.wins
 
})
);
 
// Remaining games estimate
 
const remainingWeeks =
Math.max(
14 -
(
teams[0].wins +
teams[0].losses
),
1
);
 
for (
let week = 0;
week < remainingWeeks;
week++
) {
 
const shuffled =
[...simTeams]
.sort(
() =>
Math.random()
- 0.5
);
 
for (
let i = 0;
i < shuffled.length;
i += 2
) {
 
const teamA =
shuffled[i];
 
const teamB =
shuffled[i + 1];
 
if (
!teamA ||
!teamB
) continue;
 
const win =
simulateGame(
teamA,
teamB
);
 
if (win) {
 
teamA.simWins++;
 
} else {
 
teamB.simWins++;
 
}
 
}
 
}
 
const standings =
buildStandings(
simTeams
);
 
standings.forEach(
(
team,
index
) => {
 
const result =
results.find(
r =>
r.team ===
team.team
);
 
if (
!result
) return;
 
const seed =
index + 1;
 
result.seedTotal +=
seed;
 
if (seed <= 6) {
 
result.playoffs++;
 
}
 
if (seed === 10) {
 
result.sackos++;
 
}
 
}
);
 
const champion =
simulatePlayoffs(
standings
);
 
const championResult =
results.find(
r =>
r.team ===
champion
);
 
if (
championResult
) {
 
championResult
.championships++;
 
}
 
}
 
return results
.map(result => ({
 
team:
result.team,
 
playoffOdds:
(
result.playoffs /
simulations
) * 100,
 
championshipOdds:
(
result.championships /
simulations
) * 100,
 
sackoOdds:
(
result.sackos /
simulations
) * 100,
 
averageSeed:
(
result.seedTotal /
simulations
)
 
}))
.sort(
(a, b) =>
b.playoffOdds -
a.playoffOdds
);
 
}
``
