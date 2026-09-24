export const LEAGUE_ID =
"1352723400459563008";
 
// -------------------------
// LEAGUE
// -------------------------
 
export async function getLeague() {
 
const response = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}`,
{
cache: "no-store"
}
);
 
return response.json();
}
 
// -------------------------
// USERS / OWNERS
// -------------------------
 
export async function getUsers() {
 
const response = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/users`,
{
cache: "no-store"
}
);
 
return response.json();
}
 
// -------------------------
// ROSTERS
// -------------------------
 
export async function getRosters() {
 
const response = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/rosters`,
{
cache: "no-store"
}
);
 
return response.json();
}
 
// -------------------------
// MATCHUPS
// -------------------------
 
export async function getMatchups(
week: number
) {
 
const response = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/matchups/${week}`,
{
cache: "no-store"
}
);
 
return response.json();
}
 
// -------------------------
// NFL PLAYERS DATABASE
// -------------------------
 
export async function getPlayers() {
 
const response = await fetch(
"https://api.sleeper.app/v1/players/nfl",
{
cache: "force-cache"
}
);
 
return response.json();
}
 
// -------------------------
// CURRENT NFL STATE
// -------------------------
 
export async function getNFLState() {
 
const response = await fetch(
"https://api.sleeper.app/v1/state/nfl",
{
cache: "no-store"
}
);
 
return response.json();
}
 
// -------------------------
// CURRENT WEEK
// -------------------------
 
export async function getCurrentWeek() {
 
const state =
await getNFLState();
 
return state.week;
}
 
// -------------------------
// BUILD TEAM OBJECTS
// -------------------------
 
export async function getLeagueTeams() {
 
const users =
await getUsers();
 
const rosters =
await getRosters();
 
return rosters.map(
(roster: any) => {
 
const owner =
users.find(
(user: any) =>
user.user_id ===
roster.owner_id
);
 
const wins =
roster.settings?.wins || 0;
 
const losses =
roster.settings?.losses || 0;
 
const pf =
Number(
roster.settings?.fpts || 0
) +
(
Number(
roster.settings?.fpts_decimal || 0
) / 100
);
 
const gamesPlayed =
Math.max(
wins + losses,
1
);
 
const avgPPG =
pf / gamesPlayed;
 
return {
 
rosterId:
roster.roster_id,
 
ownerId:
roster.owner_id,
 
owner:
owner?.display_name ||
"Unknown",
 
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins,
losses,
 
pf,
 
avgPPG
 
};
 
}
);
 
}
