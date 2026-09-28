import { teamProfiles } from "../data/teamProfiles";
 
function randomNormal() {
let u = 0;
let v = 0;
 
while (u === 0) {
u = Math.random();
}
 
while (v === 0) {
v = Math.random();
}
 
return (
Math.sqrt(-2 * Math.log(u)) *
Math.cos(2 * Math.PI * v)
);
}
 
function getTeamRating(team: any) {
const wins = team.wins ?? 0;
const losses = team.losses ?? 0;
 
const gamesPlayed = Math.max(
wins + losses,
1
);
 
const winPct = wins / gamesPlayed;
 
const pf = team.pf ?? 0;
 
const ppg =
pf > 0
? pf / gamesPlayed
: team.avgPPG ?? 100;
 
return (
50 +
winPct * 30 +
(ppg - 100) * 0.4
);
}
 
export function simulateGame(
teamA: any,
teamB: any
) {
const profileA =
teamProfiles[
teamA.owner as keyof typeof teamProfiles
] || {
consistency: 75,
ceiling: 40,
};
 
const profileB =
teamProfiles[
teamB.owner as keyof typeof teamProfiles
] || {
consistency: 75,
ceiling: 40,
};
 
const ratingA =
getTeamRating(teamA);
 
const ratingB =
getTeamRating(teamB);
 
const ratingDiff =
ratingA - ratingB;
 
const expectedA =
1 /
(1 +
Math.pow(
10,
-ratingDiff / 30
));
 
const baseScoreA =
100 +
expectedA * 20;
 
const baseScoreB =
100 +
(1 - expectedA) * 20;
 
const stdDevA =
Math.max(
8,
(100 - profileA.consistency) *
0.9
);
 
const stdDevB =
Math.max(
8,
(100 - profileB.consistency) *
0.9
);
 
const ceilingBoostA =
Math.random() *
(profileA.ceiling / 3);
 
const ceilingBoostB =
Math.random() *
(profileB.ceiling / 3);
 
const scoreA =
baseScoreA +
ceilingBoostA +
randomNormal() * stdDevA;
 
const scoreB =
baseScoreB +
ceilingBoostB +
randomNormal() * stdDevB;
 
return {
winner:
scoreA >= scoreB
? "A"
: "B",
 
scoreA: Number(
scoreA.toFixed(2)
),
 
scoreB: Number(
scoreB.toFixed(2)
),
};
}
