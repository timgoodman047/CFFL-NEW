export function calculatePowerScore(team: {
  pfRank: number;
  allPlayRank: number;
  threeWeekRank: number;

  top10QB: number;
  top10RB: number;
  top10WR: number;

  top3TE: number;

  wins125: number;

  precision: number;
}) {
  return (
    team.pfRank +
    team.allPlayRank +
    team.threeWeekRank / 2 +
    team.top10QB * 0.75 +
    team.top10RB +
    team.top10WR +
    team.top3TE +
    team.wins125 +
    team.precision
  );
}
