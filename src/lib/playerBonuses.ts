export function calculatePlayerBonuses(
  rosterPlayers: string[],
  players: any,
  stats: any
) {
  const allPlayers = Object.entries(stats).map(
    ([playerId, playerStats]: any) => {
      const player = players[playerId];

      return {
        playerId,
        position: player?.position,
        stats: playerStats,
      };
    }
  );

  const topQBs = allPlayers
    .filter((p) => p.position === "QB")
    .sort(
      (a, b) =>
        (b.stats?.pts_ppr ?? 0) -
        (a.stats?.pts_ppr ?? 0)
    )
    .slice(0, 10);

  const topRBs = allPlayers
    .filter((p) => p.position === "RB")
    .sort(
      (a, b) =>
        (b.stats?.pts_ppr ?? 0) -
        (a.stats?.pts_ppr ?? 0)
    )
    .slice(0, 10);

  const topWRs = allPlayers
    .filter((p) => p.position === "WR")
    .sort(
      (a, b) =>
        (b.stats?.pts_ppr ?? 0) -
        (a.stats?.pts_ppr ?? 0)
    )
    .slice(0, 10);

  const topTEs = allPlayers
    .filter((p) => p.position === "TE")
    .sort(
      (a, b) =>
        (b.stats?.pts_ppr ?? 0) -
        (a.stats?.pts_ppr ?? 0)
    )
    .slice(0, 3);

  const qbBonus =
    topQBs.filter((p) =>
      rosterPlayers.includes(p.playerId)
    ).length * 0.75;

  const rbBonus =
    topRBs.filter((p) =>
      rosterPlayers.includes(p.playerId)
    ).length;

  const wrBonus =
    topWRs.filter((p) =>
      rosterPlayers.includes(p.playerId)
    ).length;

  const teBonus =
    topTEs.filter((p) =>
      rosterPlayers.includes(p.playerId)
    ).length;

  return {
    qbBonus,
    rbBonus,
    wrBonus,
    teBonus,
  };
}
