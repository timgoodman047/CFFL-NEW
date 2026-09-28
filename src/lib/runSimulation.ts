import { teamProfiles }
from "../data/teamProfiles";
 
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
 
const stdDevA =
(100 - profileA.consistency) * 1.2;
 
const stdDevB =
(100 - profileB.consistency) * 1.2;
 
const scoreA =
teamA.avgPPG +
randomNormal() * stdDevA;
 
const scoreB =
teamB.avgPPG +
randomNormal() * stdDevB;
 
return {
winner:
scoreA >= scoreB ? "A" : "B",
 
scoreA,
scoreB,
};
}
