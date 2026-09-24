export function calculatePowerRankings(
teams: any[]
) {
 
const ranked = teams.map(team => {
 
const games =
Math.max(
team.wins +
team.losses,
1
);
 
const avgPPG =
team.pf / games;
 
const score =
(team.wins * 100) +
(team.pf * 0.5) +
(avgPPG * 10);
 
return {
...team,
avgPPG,
score
};
 
});
 
ranked.sort(
(a,b)=>b.score-a.score
);
 
return ranked;
 
}
