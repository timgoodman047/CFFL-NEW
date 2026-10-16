import { getCurrentWeek, getMatchups } from "./sleeper";

export async function getAllPlayRecords() {
  const currentWeek = await getCurrentWeek();

  const totals = new Map<number, number>();

  for (
    let week = 1;
    week < currentWeek;
    week++
  ) {
    const matchups =
      await getMatchups(week);

    const scores = matchups.map(
      (team: any) => ({
        rosterId: team.roster_id,
        points: team.points ?? 0,
      })
    );

    scores.forEach((team) => {
      let wins = 0;

      scores.forEach((other) => {
        if (
          team.rosterId !==
            other.rosterId &&
          team.points >
            other.points
        ) {
          wins++;
        }
      });

      totals.set(
        team.rosterId,
        (totals.get(
          team.rosterId
        ) ?? 0) + wins
      );
    });
  }

  return totals;
}

export async function getAllPlayRanks() {
  const records = await getAllPlayRecords();

  const entries = Array.from(records.entries());

  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([rosterId], index) => ({
      rosterId,
      rank: index + 1,
    }));
}
