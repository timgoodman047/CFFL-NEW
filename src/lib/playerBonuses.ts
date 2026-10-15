export function calculatePlayerBonuses(
  rosterPlayers: string[],
  seasonStats: any
) {
  let qbBonus = 0;
  let rbBonus = 0;
  let wrBonus = 0;
  let teBonus = 0;

  Object.values(seasonStats).forEach(
    (entry: any) => {
      if (
        !entry?.player_id ||
        !rosterPlayers
          .map(String)
          .includes(String(entry.player_id))
      ) {
        return;
      }

      const position =
        entry.player?.position;

      const rank =
        entry.stats?.pos_rank_half_ppr;

      if (
        position === "QB" &&
        rank <= 10
      ) {
        qbBonus += 0.75;
      }

      if (
        position === "RB" &&
        rank <= 10
      ) {
        rbBonus += 1;
      }

      if (
        position === "WR" &&
        rank <= 10
      ) {
        wrBonus += 1;
      }

      if (
        position === "TE" &&
        rank <= 3
      ) {
        teBonus += 1;
      }
    }
  );

  return {
    qbBonus,
    rbBonus,
    wrBonus,
    teBonus,
  };
}
