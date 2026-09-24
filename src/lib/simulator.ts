export function calculateStrength(team: any) {
 
const gamesPlayed =
Math.max(
team.wins +
team.losses,
1
);
 
const avgPPG =
team.pf / gamesPlayed;
 
return (
(team.wins * 100) +
(avgPPG * 15)
);
 
}
 
export function simulateGame(
teamA: any,
teamB: any
) {
 
const total =
teamA.strength +
teamB.strength;
 
const chanceA =
teamA.strength /
total;
 
return Math.random() < chanceA;
 
}
