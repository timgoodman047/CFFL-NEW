import { franchises } from "@/data/franchises";
 
export function getTeamRating(
owner: string
): number {
const franchise = franchises.find(
(f) => f.owner === owner
);
 
if (!franchise) {
return 50;
}
 
const rating =
franchise.winningPct * 100 +
franchise.championships * 8 +
franchise.playoffTrips * 1.5;
 
return Number(
rating.toFixed(1)
);
}
 
export function getAllRatings() {
return franchises
.map((franchise) => ({
owner: franchise.owner,
rating: getTeamRating(
franchise.owner
),
}))
.sort(
(a, b) =>
b.rating - a.rating
);
}
