"use client";

import Link from "next/link";

import { franchises } from "../../data/franchises";

import {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";

const LEAGUE_ID = "1352723400459563008";

export default function StandingsPage() {
  const [rosters, setRosters] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [sosRanks, setSosRanks] =
    useState<Record<number, number>>({});

  const [allPlayData, setAllPlayData] =
  useState<Record<number, any>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const [rostersRes, usersRes, stateRes] =
  await Promise.all([
    fetch(
      `https://api.sleeper.app/v1/league/${LEAGUE_ID}/rosters`
    ),
    fetch(
      `https://api.sleeper.app/v1/league/${LEAGUE_ID}/users`
    ),
    fetch(
      "https://api.sleeper.app/v1/state/nfl"
    ),
  ]);

        const rostersData = await rostersRes.json();
        const usersData = await usersRes.json();

        const stateData = await stateRes.json();

const currentWeek =
  stateData.week;

const matchupRequests = [];

for (
  let week = 1;
  week < currentWeek;
  week++
) {
  matchupRequests.push(
    fetch(
      `https://api.sleeper.app/v1/league/${LEAGUE_ID}/matchups/${week}`
    ).then((r) => r.json())
  );
}

const matchupWeeks =
  await Promise.all(matchupRequests);

const allPlayWins =
  new Map<number, number>();

const allPlayLosses =
  new Map<number, number>();

matchupWeeks.forEach(
  (matchups: any[]) => {
    matchups.forEach((teamA) => {
      let wins = 0;
      let losses = 0;

      matchups.forEach((teamB) => {
        if (
          teamA.roster_id ===
          teamB.roster_id
        ) {
          return;
        }

        if (teamA.points > teamB.points) {
          wins++;
        } else if (
          teamA.points < teamB.points
        ) {
          losses++;
        }
      });

      allPlayWins.set(
        teamA.roster_id,
        (allPlayWins.get(
          teamA.roster_id
        ) ?? 0) + wins
      );

      allPlayLosses.set(
        teamA.roster_id,
        (allPlayLosses.get(
          teamA.roster_id
        ) ?? 0) + losses
      );
    });
  }
);

const allPlayMap =
  Object.fromEntries(
    rostersData.map((roster: any) => [
      roster.roster_id,
      {
        wins:
          allPlayWins.get(
            roster.roster_id
          ) ?? 0,

        losses:
          allPlayLosses.get(
            roster.roster_id
          ) ?? 0,
      },
    ])
  );

const pfMap = Object.fromEntries(
  rostersData.map((roster: any) => [
    roster.roster_id,
    Number(roster.settings?.fpts ?? 0) +
      Number(
        roster.settings?.fpts_decimal ?? 0
      ) /
        100,
  ])
);

const opponentTotals =
  new Map<number, number>();

const gamesPlayed =
  new Map<number, number>();

matchupWeeks.forEach(
  (matchups: any[]) => {
    const games =
      new Map<number, any[]>();

    matchups.forEach((team) => {
      const game =
        games.get(team.matchup_id) ?? [];

      game.push(team);

      games.set(
        team.matchup_id,
        game
      );
    });

    games.forEach((game) => {
      if (game.length !== 2) return;

      const [teamA, teamB] = game;

      opponentTotals.set(
        teamA.roster_id,
        (opponentTotals.get(
          teamA.roster_id
        ) ?? 0) +
          (pfMap[teamB.roster_id] ?? 0)
      );

      opponentTotals.set(
        teamB.roster_id,
        (opponentTotals.get(
          teamB.roster_id
        ) ?? 0) +
          (pfMap[teamA.roster_id] ?? 0)
      );

      gamesPlayed.set(
        teamA.roster_id,
        (gamesPlayed.get(
          teamA.roster_id
        ) ?? 0) + 1
      );

      gamesPlayed.set(
        teamB.roster_id,
        (gamesPlayed.get(
          teamB.roster_id
        ) ?? 0) + 1
      );
    });
  }
);

const sosRanks = Object.fromEntries(
  Array.from(
    opponentTotals.entries()
  )
    .map(
      ([rosterId, totalOpponentPF]) => ({
        rosterId,
        averageOpponentPF:
          totalOpponentPF /
          (gamesPlayed.get(
            rosterId
          ) ?? 1),
      })
    )
    .sort(
      (a, b) =>
        b.averageOpponentPF -
        a.averageOpponentPF
    )
    .map((team, index) => [
      team.rosterId,
      index + 1,
    ])
);

        setSosRanks(sosRanks);

        setAllPlayData(allPlayMap);
        
        setRosters(rostersData);
        setUsers(usersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

const standings = useMemo(() => {
  const teams = rosters.map((roster) => {
    const owner = users.find(
      (u) => u.user_id === roster.owner_id
    );

    return {
  rosterId: roster.roster_id,

  teamName:
    owner?.metadata?.team_name ||
    owner?.display_name ||
    `Team ${roster.roster_id}`,

  slug:
    franchises.find(
      (f) =>
        f.sleeperTeam ===
        (owner?.metadata?.team_name ||
          owner?.display_name)
    )?.slug || "",

  wins: roster.settings?.wins ?? 0,

  losses: roster.settings?.losses ?? 0,

  ties: roster.settings?.ties ?? 0,

  fpts:
    Number(roster.settings?.fpts ?? 0) +
    Number(
      roster.settings?.fpts_decimal ?? 0
    ) /
      100,

  fptsAgainst:
  Number(
    roster.settings?.fpts_against ?? 0
  ) +
  Number(
    roster.settings?.fpts_against_decimal ?? 0
  ) / 100,

sosRank:
  sosRanks[roster.roster_id] ?? 0,

allPlayWins:
    allPlayData[
      roster.roster_id
    ]?.wins ?? 0,

  allPlayLosses:
    allPlayData[
      roster.roster_id
    ]?.losses ?? 0,

  luck:
  (roster.settings?.wins ?? 0) -
  (
    (
      allPlayData[
        roster.roster_id
      ]?.wins ?? 0
    ) / 9
  ),
};
});

// TOP 5 BY RECORD
const topFive = [...teams]
  .sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }

    return b.fpts - a.fpts;
  })
  .slice(0, 5);

// REMAINING TEAMS BY PF
const bottomFive = teams
  .filter(
    (team) =>
      !topFive.some(
        (t) => t.rosterId === team.rosterId
      )
  )
  .sort((a, b) => b.fpts - a.fpts);

return [...topFive, ...bottomFive];
}, [rosters, users, sosRanks, allPlayData]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading standings...
      </div>
    );
  }

 const playoffCutoff = standings[5];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Valley Forge Auto Standings
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-500">
          <thead className="bg-gray-900">
  <tr>
    <th className="p-3 border border-gray-500 text-left">
      Rank
    </th>

    <th className="p-3 border border-gray-500 text-left">
      Team
    </th>

    <th className="p-3 border border-gray-500">
W
</th>

    <th className="p-3 border border-gray-500">
  L
</th>

    <th className="p-3 border border-gray-500">
      T
    </th>

    <th className="p-3 border border-gray-500">
  PF
</th>

    <th className="p-3 border border-gray-500">
  PA
</th>

    <th className="p-3 border border-gray-500">
  SOS
</th>

<th className="p-3 border border-gray-500">
  All-Play
</th>

<th className="p-3 border border-gray-500">
  Luck
</th>

<th className="p-3 border border-gray-500">
  Back
</th>
  </tr>
</thead>

<tbody>
  {standings.map((team, index) => (
    <Fragment key={team.rosterId}>
      <tr
        className={`hover:bg-gray-900 ${
          index < 5 ? "bg-green-950/30" : ""
        }`}
      >
        <td className="p-3 border border-gray-500">
          {index === 0 ? "🏆" : index + 1}
        </td>

        <td className="p-3 border border-gray-500 font-semibold">
          {team.teamName}
          {index < 5 ? (
            <span className="ml-2 text-green-400">
              👑
            </span>
          ) : (
            <span className="ml-2 text-yellow-400">
              ⭐
            </span>
          )}
        </td>

        <td className="p-3 border border-gray-500">
          {team.wins}
        </td>

        <td className="p-3 border border-gray-500">
          {team.losses}
        </td>

        <td className="p-3 border border-gray-500">
          {team.ties}
        </td>

        <td className="p-3 border border-gray-500">
          {team.fpts.toFixed(2)}
        </td>

        <td className="p-3 border border-gray-500">
          {team.fptsAgainst.toFixed(2)}
        </td>

        <td className="p-3 border border-gray-500">
          {team.sosRank}
        </td>

<td className="p-3 border border-gray-500">
  {team.allPlayWins}-
  {team.allPlayLosses}
</td>

<td className="p-3 border border-gray-500">
  {team.luck > 0 ? "+" : ""}
  {team.luck.toFixed(1)}
</td>

<td className="p-3 border border-gray-500">
  {index >= 6
    ? (
        playoffCutoff.fpts -
        team.fpts
      ).toFixed(2)
    : "-"}
</td>
      </tr>
    </Fragment>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
