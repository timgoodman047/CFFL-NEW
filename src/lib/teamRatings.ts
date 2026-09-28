import { franchiseStats } from "@/data/franchiseStats";
 
export function getTeamRating(team: string): number {
const stats = franchiseStats.find(
(f) => f.name === team
);
 
if (!stats) {
return 75;
}
 
const winPct =
stats.wins /
Math.max(1, stats.wins + stats.losses);
 
const championships =
stats.championships ?? 0;
 
const playoffWins =
stats.playoffWins ?? 0;
 
let rating = 50;
 
rating += winPct * 40;
rating += championships * 3;
rating += playoffWins * 0.15;
 
return Number(rating.toFixed(1));
}
