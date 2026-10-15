"use client";

import { useEffect, useState } from "react";

import {
  getCurrentWeek,
  getMatchups,
  getLeagueTeams,
} from "../../lib/sleeper";

export default function LiveStandingsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [matchups, setMatchups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const week = await getCurrentWeek();

      const [leagueTeams, leagueMatchups] =
        await Promise.all([
          getLeagueTeams(),
          getMatchups(week),
        ]);

      setTeams(leagueTeams);
      setMatchups(leagueMatchups);
      setLoading(false);
    }

    loadData();

    const interval = setInterval(
      loadData,
      60000
    );

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        Loading live standings...
      </div>
    );
  }

  const liveTeams = teams.map((team) => ({
    ...team,
    liveWins: team.wins,
    liveLosses: team.losses,
  }));

  const matchupGroups = new Map<number, any[]>();

  for (const matchup of matchups) {
    if (!matchupGroups.has(matchup.matchup_id)) {
      matchupGroups.set(
        matchup.matchup_id,
        []
      );
    }

    matchupGroups
      .get(matchup.matchup_id)!
      .push(matchup);
  }

  Array.from(matchupGroups.values()).forEach(
    (game) => {
      if (game.length !== 2) return;

      const teamA = liveTeams.find(
        (t) =>
          t.rosterId === game[0].roster_id
      );

      const teamB = liveTeams.find(
        (t) =>
          t.rosterId === game[1].roster_id
      );

      if (!teamA || !teamB) return;

      const scoreA = game[0].points ?? 0;
      const scoreB = game[1].points ?? 0;

      const startersA =
        game[0].starters ?? [];
      const startersB =
        game[1].starters ?? [];

      const starterPointsA =
        game[0].starters_points ?? [];

      const starterPointsB =
        game[1].starters_points ?? [];

      const playedA =
        starterPointsA.filter(
          (p: number) => p > 0
        ).length;

      const playedB =
        starterPointsB.filter(
          (p: number) => p > 0
        ).length;

      const remainingA =
        startersA.length - playedA;

      const remainingB =
        startersB.length - playedB;

      const avgPlayerA =
        teamA.avgPPG /
        Math.max(startersA.length, 1);

      const avgPlayerB =
        teamB.avgPPG /
        Math.max(startersB.length, 1);

      const projectedA =
        scoreA +
        remainingA * avgPlayerA;

      const projectedB =
        scoreB +
        remainingB * avgPlayerB;

      if (projectedA > projectedB) {
        teamA.liveWins += 1;
        teamB.liveLosses += 1;
      } else if (projectedB > projectedA) {
        teamB.liveWins += 1;
        teamA.liveLosses += 1;
      }
    }
  );

  const recordQualifiers = [...liveTeams]
    .sort((a, b) => {
      if (b.liveWins !== a.liveWins) {
        return (
          b.liveWins - a.liveWins
        );
      }

      return b.pf - a.pf;
    })
    .slice(0, 5);

  const remainingTeams =
    liveTeams.filter(
      (team) =>
        !recordQualifiers.some(
          (q) =>
            q.rosterId ===
            team.rosterId
        )
    );

  const pfQualifier =
    [...remainingTeams].sort(
      (a, b) => b.pf - a.pf
    )[0];

  const chasingTeams =
    remainingTeams
      .filter(
        (team) =>
          team.rosterId !==
          pfQualifier?.rosterId
      )
      .sort((a, b) => b.pf - a.pf);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        ⚡ Live Standings
      </h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          👑 Record Qualifiers
        </h2>

        {recordQualifiers.map(
          (team, index) => (
            <div
              key={team.rosterId}
              className="flex justify-between py-2 border-b border-gray-700"
            >
              <span>
                {index + 1}. {team.team}
              </span>

              <span>
                {team.wins}-{team.losses}
                {" → "}
                {team.liveWins}-
                {team.liveLosses}
              </span>
            </div>
          )
        )}
      </div>

      {pfQualifier && (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            ⭐ Points For Qualifier
          </h2>

          <div className="flex justify-between">
            <span>{pfQualifier.team}</span>

            <span>
              {pfQualifier.pf.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          🔥 Chasing
        </h2>

        {chasingTeams.map((team) => (
          <div
            key={team.rosterId}
            className="flex justify-between py-2 border-b border-gray-700"
          >
            <span>{team.team}</span>

            <span>
              {(
                pfQualifier.pf -
                team.pf
              ).toFixed(2)}
              {" back"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
