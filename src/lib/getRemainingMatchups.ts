import {
getCurrentWeek,
getMatchups,
} from "./sleeper";
 
export async function getRemainingMatchups() {
const currentWeek =
await getCurrentWeek();
 
const remainingWeeks: any[] = [];
 
for (
let week = currentWeek;
week <= 14;
week++
) {
const matchups =
await getMatchups(week);
 
remainingWeeks.push({
week,
matchups,
});
}
 
return remainingWeeks;
}
