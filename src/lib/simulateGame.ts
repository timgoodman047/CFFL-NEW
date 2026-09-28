export function simulateGame(
teamAPpg: number,
teamBPpg: number
) {
const teamAScore =
teamAPpg +
(Math.random() * 40 - 20);
 
const teamBScore =
teamBPpg +
(Math.random() * 40 - 20);
 
return {
winner:
teamAScore >= teamBScore
? "A"
: "B",
 
scoreA:
Math.round(teamAScore * 10) /
10,
 
scoreB:
Math.round(teamBScore * 10) /
10,
};
}
