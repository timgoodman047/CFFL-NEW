export function findLeagueTeam(
  rankingTeamName: string,
  leagueTeams: any[]
) {
  return leagueTeams.find(
    (team) => team.team === rankingTeamName
  );
}
