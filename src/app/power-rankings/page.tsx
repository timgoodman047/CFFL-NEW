import { previousWeekRanks } from "../../data/history/index";
import { powerRankings } from "../../data/powerRankings";
import { calculatePowerScore } from "../../lib/powerRankings";
import {
  getLeagueTeams,
  getSeasonStats,
  getPlayers,
} from "../../lib/sleeper";

import { 
  getAllPlayRanks,
  getThreeWeekRanks,
  get125Wins,
} from "../../lib/allPlay";

import { calculatePlayerBonuses } from "../../lib/playerBonuses";

export default async function PowerRankingsPage() {

const seasonStats = await getSeasonStats();
  
const leagueTeams = await getLeagueTeams();  
  
const players = await getPlayers();

const allPlayRanks = await getAllPlayRanks();

const threeWeekRanks = await getThreeWeekRanks();

const wins125Data = await get125Wins();

const allPlayMap =
  Object.fromEntries(
    allPlayRanks.map((team) => [
      team.rosterId,
      team.rank,
    ])
  );

const threeWeekMap =
  Object.fromEntries(
    threeWeekRanks.map((team) => [
      team.rosterId,
      team.rank,
    ])
  );

  const wins125Map =
  Object.fromEntries(
    Array.from(
      wins125Data.entries()
    )
  );
  
const pfRankMap = Object.fromEntries(
  [...leagueTeams]
    .sort((a, b) => (b.pf ?? 0) - (a.pf ?? 0))
    .map((team, index) => [
      team.team,
      index + 1,
    ])
);
const rankings = powerRankings.rankings
  .map((ranking) => {
    const leagueTeam = leagueTeams.find(
      (team) =>
        team.team
          .toLowerCase()
          .replace(/\s+/g, "") ===
        ranking.team
          .toLowerCase()
          .replace(/\s+/g, "")
    );

    const previousRank =
  previousWeekRanks[ranking.team] ??
  ranking.rank;

    const allPlayRank =
      allPlayMap[
        leagueTeam?.roster_id ??
        leagueTeam?.rosterId
      ] ?? 10;

    const pfRank =
  pfRankMap[
    leagueTeam?.team ?? ""
  ] ?? 10;

    const threeWeekRank =
      threeWeekMap[
        leagueTeam?.roster_id ??
        leagueTeam?.rosterId
      ] ?? 10;

    const wins125 =
  wins125Map[
    leagueTeam?.roster_id ??
    leagueTeam?.rosterId
  ] ?? 0;

    const bonuses = calculatePlayerBonuses(
      leagueTeam?.players ?? [],
      seasonStats
    );

    return {
      ...ranking,

      previousRank,

      pfRank:
    pfRankMap[leagueTeam?.team ?? ""] ??
    pfRank,
      
      allPlayRank,

      wins125,
      
      threeWeekRank,
      
      leagueTeam,

      qbBonus: bonuses.qbBonus,
      rbBonus: bonuses.rbBonus,
      wrBonus: bonuses.wrBonus,
      teBonus: bonuses.teBonus,

      powerScore: calculatePowerScore({
  ...ranking,
  pfRank,
  allPlayRank,
  wins125,
  threeWeekRank,
  qbBonus: bonuses.qbBonus,
  rbBonus: bonuses.rbBonus,
  wrBonus: bonuses.wrBonus,
  teBonus: bonuses.teBonus,
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

<div className="text-sm text-gray-500 mb-6">
  PF Rank: {team.pfRank} •
  All-Play: {team.allPlayRank} •
  3W Avg: {team.threeWeekRank} •
  QB Bonus: {team.qbBonus ?? 0} •
  RB Bonus: {team.rbBonus ?? 0} •
  WR Bonus: {team.wrBonus ?? 0} •
  TE Bonus: {team.teBonus ?? 0} •
  125+ Wins: {team.wins125} •
  Precision: {team.precision}
</div>
            
<hr
  style={{
    borderColor: "#374151",
    margin: "16px 0",
  }}
/>

<div style={{ height: "24px" }} />

<div className="text-gray-300 whitespace-pre-line">
  {team.summary}
</div>

<hr
  style={{
    borderColor: "#374151",
    marginTop: "20px",
    marginBottom: "8px",
  }}
/>
          </div>
        ))}
      </div>
    </div>
  );
}
