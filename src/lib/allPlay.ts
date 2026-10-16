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

export async function getThreeWeekRanks() {
  const currentWeek = await getCurrentWeek();

  const scores = new Map<number, number[]>();

  for (let week = 1; week < currentWeek; week++) {
    const matchups = await getMatchups(week);

    matchups.forEach((team: any) => {
      const existing =
        scores.get(team.roster_id) ?? [];

      existing.push(team.points ?? 0);

      scores.set(
        team.roster_id,
        existing
      );
    });
  }

  const averages = Array.from(
    scores.entries()
  ).map(([rosterId, weeks]) => {
    const last3 = weeks.slice(-3);

    const avg =
      last3.reduce(
        (sum, score) => sum + score,
        0
      ) / last3.length;

    return {
      rosterId,
      avg,
    };
  });

  return averages
    .sort((a, b) => b.avg - a.avg)
    .map((team, index) => ({
      rosterId: team.rosterId,
      rank: index + 1,
    }));
}

export async function get125Wins() {
  const currentWeek = await getCurrentWeek();

  const totals = new Map<number, number>();

  for (let week = 1; week < currentWeek; week++) {
    const matchups = await getMatchups(week);

    matchups.forEach((team: any) => {
      const current =
        totals.get(team.roster_id) ?? 0;

      if ((team.points ?? 0) >= 125) {
        totals.set(
          team.roster_id,
          current + 1
        );
      } else {
        totals.set(
          team.roster_id,
          current
        );
      }
    });
  }

  return totals;
}
