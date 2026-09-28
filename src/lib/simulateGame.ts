import { teamProfiles }
from "../data/teamProfiles";
 
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
 
const varianceA =
(100 - profileA.consistency) *
Math.random();
 
const varianceB =
(100 - profileB.consistency) *
Math.random();
 
const ceilingA =
Math.random() *
profileA.ceiling;
 
const ceilingB =
Math.random() *
profileB.ceiling;
 
const scoreA =
teamA.avgPPG +
ceilingA -
varianceA;
 
const scoreB =
teamB.avgPPG +
ceilingB -
varianceB;
 
return {
winner:
scoreA >= scoreB
? "A"
: "B",
 
scoreA,
scoreB,
};
}
