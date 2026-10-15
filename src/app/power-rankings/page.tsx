import { powerRankings } from "../../data/powerRankings";
import { calculatePowerScore } from "../../lib/powerRankings";
import {
  getLeagueTeams,
  getSeasonStats,
  getPlayers,
} from "../../lib/sleeper";

import { calculatePlayerBonuses } from "../../lib/playerBonuses";

export default async function PowerRankingsPage() {

const seasonStats = await getSeasonStats();
  
const leagueTeams = await getLeagueTeams();

const players =
  await getPlayers();
  const rankings = powerRankings.rankings
  .map((ranking) => {
    const leagueTeam = leagueTeams.find(
      (team) => team.team === ranking.team
    );

    const bonuses =
  calculatePlayerBonuses(
    leagueTeam?.players ?? [],
    seasonStats
  );

return {
  ...ranking,
  leagueTeam,
  ...bonuses,

  powerScore:
    calculatePowerScore({
      ...ranking,
      ...bonuses,
    }),
};
  })
  .sort(
    (a, b) =>
      a.powerScore - b.powerScore
  );
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-2">
        📈 CFFL Power Rankings
      </h1>

      <p className="text-gray-400 mb-8">
  Week {powerRankings.week} • Published {powerRankings.published}
</p>

      <div className="space-y-4">
        {rankings.map((team, index) => (
          <div
            key={team.rank}
            className="bg-gray-900 rounded-xl p-5 border border-gray-800"
          >
 <div className="flex justify-between items-center mb-2">
  <h2 className="text-2xl font-bold">
    #{index + 1} {team.team}
  </h2>

  <div>
    {team.previousRank > index + 1 && (
      <span className="text-green-400 font-bold">
        ↑ {team.previousRank - (index + 1)}
      </span>
    )}

    {team.previousRank < index + 1 && (
      <span className="text-red-400 font-bold">
        ↓ {(index + 1) - team.previousRank}
      </span>
    )}

    {team.previousRank === index + 1 && (
      <span className="text-gray-400 font-bold">
        →
      </span>
    )}
  </div>
</div>

<div className="text-sm text-gray-400 mb-2">
  Record: {team.leagueTeam?.wins ?? 0}-
  {team.leagueTeam?.losses ?? 0}
  {" • "}
  PF: {team.leagueTeam?.pf?.toFixed(2) ?? "0.00"}
</div>           

<div className="text-green-400 font-semibold mb-3">
  Power Score: {team.powerScore.toFixed(2)}
</div>

<div className="text-sm text-gray-500 mb-4">
  PF Rank: {team.pfRank} •
  All-Play: {team.allPlayRank} •
  3W Avg: {team.threeWeekRank} •
  QB: {team.top10QB} •
  RB: {team.top10RB} •
  WR: {team.top10WR} •
  Elite TE: {team.top3TE} •
  125+ Wins: {team.wins125} •
  Precision: {team.precision}
</div>

<div className="text-gray-300 whitespace-pre-line">
  {team.summary}
</div>
          </div>
        ))}
      </div>
    </div>
  );
}
