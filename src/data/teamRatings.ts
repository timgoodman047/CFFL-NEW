import { simulationData } from "./simulationData";
 
export function getTeamRating(
teamName: string
): number {
const team = simulationData.find(
(t) => t.team === teamName
);
 
if (!team) {
return 50;
}
 
const gamesPlayed =
team.wins + team.losses;
 
const winPct =
gamesPlayed > 0
? team.wins / gamesPlayed
: 0.5;
 
const avgPF =
gamesPlayed > 0
? team.pointsFor /
gamesPlayed
: 120;
 
const rating =
winPct * 60 +
avgPF * 0.35;
 
return Number(
rating.toFixed(1)
);
}
 
export function getAllRatings() {
return simulationData
.map((team) => ({
team: team.team,
rating: getTeamRating(
team.team
),
}))
.sort(
(a, b) =>
b.rating - a.rating
);
}
