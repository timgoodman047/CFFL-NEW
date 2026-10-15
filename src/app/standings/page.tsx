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

type SortField =
  | "wins"
  | "losses"
  | "fpts"
  | "fptsAgainst";

export default function StandingsPage() {
  const [rosters, setRosters] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] =
    useState<SortField>("wins");

  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [rostersRes, usersRes] = await Promise.all([
          fetch(
            `https://api.sleeper.app/v1/league/${LEAGUE_ID}/rosters`
          ),
          fetch(
            `https://api.sleeper.app/v1/league/${LEAGUE_ID}/users`
          ),
        ]);

        const rostersData = await rostersRes.json();
        const usersData = await usersRes.json();

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
  ) /
    100,
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
  const bottomFive = [...teams]
    .filter(
      (team) =>
        !topFive.some(
          (t) => t.rosterId === team.rosterId
        )
    )
    .sort((a, b) => b.fpts - a.fpts);

  const sortedStandings = [...topFive, ...bottomFive];

  sortedStandings.sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "wins":
        comparison = a.wins - b.wins;
        break;

      case "losses":
        comparison = a.losses - b.losses;
        break;

      case "fpts":
        comparison = a.fpts - b.fpts;
        break;

      case "fptsAgainst":
        comparison = a.fptsAgainst - b.fptsAgainst;
        break;
    }

    return sortAsc ? comparison : -comparison;
  });

  return sortedStandings;
}, [rosters, users, sortField, sortAsc]);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading standings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        CFFL Standings
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Team</th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("wins")}
              >
                W
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("losses")}
              >
                L
              </th>

              <th className="p-3">T</th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("fpts")}
              >
                PF
              </th>

              <th
  className="p-3 cursor-pointer"
  onClick={() => handleSort("fptsAgainst")}
>
  PA
</th>

<th className="p-3">
  Back
</th>
            </tr>
          </thead>

<tbody>
  {standings.map((team, index) => (
    <Fragment key={team.rosterId}>
  <tr
    className={`border-t border-gray-700 hover:bg-gray-900 ${
      index < 5 ? "bg-green-950/30" : ""
    }`}
  >
    <td className="p-3">
      {index === 0 ? "🏆" : index + 1}
    </td>

    <td className="p-3 font-semibold">
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

<td className="p-3">
  {team.wins}
</td>

        <td className="p-3">
          {team.losses}
        </td>

        <td className="p-3">
          {team.ties}
        </td>

        <td className="p-3">
          {team.fpts.toFixed(2)}
        </td>

        <td className="p-3">
  {team.fptsAgainst.toFixed(2)}
</td>

<td className="p-3">
  {index >= 6
    ? (
        standings[5].fpts - team.fpts
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
