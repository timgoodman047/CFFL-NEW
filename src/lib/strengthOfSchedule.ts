import {
  getCurrentWeek,
  getMatchups,
  getLeagueTeams,
} from "./sleeper";

export async function getStrengthOfSchedule() {
  const currentWeek = await getCurrentWeek();
  const leagueTeams = await getLeagueTeams();

  const pfMap = Object.fromEntries(
    leagueTeams.map((team) => [
      team.roster_id,
      team.pf ?? 0,
    ])
  );

  const totals = new Map<number, number>();
  const gamesPlayed = new Map<number, number>();

  for (let week = 1; week < currentWeek; week++) {
    const matchups = await getMatchups(week);

    const matchupGroups = new Map<number, any[]>();

    matchups.forEach((team: any) => {
      const game =
        matchupGroups.get(team.matchup_id) ?? [];

      game.push(team);

      matchupGroups.set(
        team.matchup_id,
        game
      );
    });

    matchupGroups.forEach((game) => {
      if (game.length !== 2) return;

      const [teamA, teamB] = game;

      totals.set(
        teamA.roster_id,
        (totals.get(teamA.roster_id) ?? 0) +
          (pfMap[teamB.roster_id] ?? 0)
      );

      totals.set(
        teamB.roster_id,
        (totals.get(teamB.roster_id) ?? 0) +
          (pfMap[teamA.roster_id] ?? 0)
      );

      gamesPlayed.set(
        teamA.roster_id,
        (gamesPlayed.get(teamA.roster_id) ?? 0) + 1
      );

      gamesPlayed.set(
        teamB.roster_id,
        (gamesPlayed.get(teamB.roster_id) ?? 0) + 1
      );
    });
  }

  return Array.from(totals.entries())
    .map(([rosterId, totalPF]) => ({
      rosterId,
      averageOpponentPF:
        totalPF /
        (gamesPlayed.get(rosterId) ?? 1),
    }))
    .sort(
      (a, b) =>
        b.averageOpponentPF -
        a.averageOpponentPF
    );
}
