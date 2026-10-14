"use client";

import { useEffect, useMemo, useState } from "react";

const LEAGUE_ID = process.env.NEXT_PUBLIC_SLEEPER_LEAGUE_ID!;

type SortField =
  | "wins"
  | "losses"
  | "fpts"
  | "fpts_against";

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
    const rows = rosters.map((roster) => {
      const owner = users.find(
        (u) => u.user_id === roster.owner_id
      );

      return {
        rosterId: roster.roster_id,
        teamName:
          owner?.metadata?.team_name ||
          owner?.display_name ||
          `Team ${roster.roster_id}`,
        wins: roster.settings?.wins ?? 0,
        losses: roster.settings?.losses ?? 0,
        ties: roster.settings?.ties ?? 0,
        fpts: Number(roster.settings?.fpts ?? 0),
        fpts_against: Number(
          roster.settings?.fpts_against ?? 0
        ),
      };
    });

    rows.sort((a, b) => {
      const dir = sortAsc ? 1 : -1;

      return (
        ((a[sortField] as number) -
          (b[sortField] as number)) * dir
      );
    });

    return rows;
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
                onClick={() =>
                  handleSort("fpts_against")
                }
              >
                PA
              </th>
            </tr>
          </thead>

          <tbody>
            {standings.map((team, index) => (
              <tr
                key={team.rosterId}
                className="border-t border-gray-700 hover:bg-gray-900"
              >
                <td className="p-3">
                  {index + 1}
                </td>

                <td className="p-3 font-semibold">
                  {team.teamName}
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
                  {team.fpts_against.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
