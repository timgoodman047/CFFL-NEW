export const LEAGUE_ID =
"1352723400459563008";
 
export async function getUsers() {
const res = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/users`,
{
cache: "no-store",
}
);
 
return res.json();
}
 
export async function getRosters() {
const res = await fetch(
`https://api.sleeper.app/v1/league/${LEAGUE_ID}/rosters`,
{
cache: "no-store",
}
);
 
return res.json();
}
