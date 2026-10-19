import { getCurrentWeek, getMatchups } from "./sleeper";

export async function get125PointWins() {
  const currentWeek = await getCurrentWeek();
  const totals = new Map<number, number>();

  for (let week = 1; week < currentWeek; week++) {
    const matchups = await getMatchups(week);

    const matchupGroups = new Map<number, typeof matchups>();

    matchups.forEach((team) => {
      const existing =
        matchupGroups.get(team.matchup_id) ?? [];

      existing.push(team);

      matchupGroups.set(
        team.matchup_id,
        existing
      );
    });

    matchupGroups.forEach((game) => {
      if (game.length !== 2) return;

      const [teamA, teamB] = game;

      if (teamA.points > teamB.points) {
        if (teamB.points >= 125) {
          totals.set(
            teamA.roster_id,
            (totals.get(teamA.roster_id) ?? 0) + 1
          );
        }
      } else if (teamB.points > teamA.points) {
        if (teamA.points >= 125) {
          totals.set(
            teamB.roster_id,
            (totals.get(teamB.roster_id) ?? 0) + 1
          );
        }
      }
    });
  }

  return Array.from(totals.entries()).map(
    ([rosterId, wins125]) => ({
      rosterId,
      wins125,
    })
  );
}
