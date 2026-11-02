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
  livePF: team.pf,
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

      teamA.livePF += game[0].points ?? 0;
      teamB.livePF += game[1].points ?? 0;

      const scoreA = game[0].points ?? 0;
      const scoreB = game[1].points ?? 0;

      const liveScoreA = scoreA;

const liveScoreB = scoreB;

if (liveScoreA > liveScoreB) {
  teamA.liveWins += 1;
  teamB.liveLosses += 1;
} else if (liveScoreB > liveScoreA) {
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

      return b.livePF - a.livePF;
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
    (a, b) => b.livePF - a.livePF
  )[0];

  const chasingTeams =
    remainingTeams
      .filter(
        (team) =>
          team.rosterId !==
          pfQualifier?.rosterId
      )
      .sort((a, b) => b.livePF - a.livePF);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        ⚡ Live Standings
      </h1>

      <p className="text-gray-400 mb-8">
  If games ended right now.
</p>

      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-500 mb-6">
          👑 Record Qualifiers
        </h2>

        {recordQualifiers.map(
          (team, index) => (
<div
  key={team.rosterId}
  className="grid grid-cols-[minmax(0,1fr)_120px_90px] gap-4 py-2 border-b border-gray-700 items-center"
>
  <span>
    {index + 1}. {team.team}
  </span>

  <span className="text-right text-gray-300">
    {(team.livePF ?? 0).toFixed(2)} PF
  </span>

  <span className="text-right text-green-400">
    {team.liveWins}-{team.liveLosses}
  </span>
</div>            
          )
        )}
      </div>

      {pfQualifier && (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            ⭐ Points For Qualifier
          </h2>

 {[pfQualifier, ...chasingTeams]
  .filter(Boolean)
  .sort((a, b) => b.livePF - a.livePF)
  .map((team, index) => (
    <div
  key={team.rosterId}
  className="py-3 border-b border-gray-700"
>
      <span>
  {index + 1}. {team.team}
  {" "}
  ({team.liveWins}-{team.liveLosses})
</span>

      <span>
        {team.livePF.toFixed(2)} PF
      </span>
    </div>
  ))}         
        </div>
      )}

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-6">
          🔥 Chasing
        </h2>

        {chasingTeams.map((team) => (
         <div
  key={team.rosterId}
  className="grid grid-cols-[1fr_110px_90px] gap-4 py-2 border-b border-gray-700 items-center"
>
  <span>{team.team}</span>

  <span>
    {team.livePF.toFixed(2)} PF
    {" • "}
    {(pfQualifier.livePF - team.livePF).toFixed(2)}
    {" back"}
  </span>
</div> 
        ))}
      </div>
    </div>
  );
}
