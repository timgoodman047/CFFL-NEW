export function calculatePowerScore(team: {
  pfRank: number;
  allPlayRank: number;
  threeWeekRank: number;

  qbBonus: number;
  rbBonus: number;
  wrBonus: number;
  teBonus: number;

  wins125: number;

  precision: number;
}) {
  return (
    team.pfRank +
    team.allPlayRank +
    team.threeWeekRank / 2 +
    team.qbBonus +
    team.rbBonus +
    team.wrBonus +
    team.teBonus +
    team.wins125 +
    team.precision
  );
}
