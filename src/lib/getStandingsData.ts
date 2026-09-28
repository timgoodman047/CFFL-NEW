import {
getUsers,
getRosters,
} from "./sleeper";
 
export async function getStandingsData() {
const users = await getUsers();
const rosters = await getRosters();
 
return rosters.map((r: any) => {
const owner = users.find(
(u: any) =>
u.user_id === r.owner_id
);
 
return {
team:
owner?.metadata?.team_name ||
owner?.display_name ||
"Unknown",
 
wins:
r.settings?.wins || 0,
 
losses:
r.settings?.losses || 0,
 
pointsFor:
Number(r.settings?.fpts || 0) +
Number(
r.settings?.fpts_decimal || 0
) /
100,
};
});
}
