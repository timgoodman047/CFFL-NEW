"use client";

import { useState } from "react";

export default function PlayoffPredictorClient({
  schedule,
  standings,
}: {
  schedule: any[];
  standings: any[];
}) {
  const [picks, setPicks] = useState<
    Record<string, number>
  >({});

  function selectWinner(
    week: number,
    matchupId: number,
    rosterId: number
  ) {
    setPicks((prev) => ({
      ...prev,
      [`${week}-${matchupId}`]: rosterId,
    }));
  }

  const projectedStandings = standings.map(
  (team) => ({
    ...team,
  })
);
  
  return (
    <div>
      
      {schedule.map((weekData) => (
        <div
          key={weekData.week}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            Week {weekData.week}
          </h2>

          {weekData.matchups.map(
            (matchup: any) => (
              <div
                key={matchup.matchupId}
                className="border border-gray-700 rounded p-4 mb-2"
              >
                <button
  style={{
    backgroundColor:
      String(
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ]
      ) === String(matchup.team1.rosterId)
        ? "green"
        : "#1f2937",
    color: "white",
  }}
  className="w-full text-left p-2 rounded"
  onClick={() =>
    selectWinner(
      weekData.week,
      matchup.matchupId,
      matchup.team1.rosterId
    )
  }
>
  {matchup.team1.team}
</button>   

<div className="text-gray-500 my-2 text-center">
  vs
</div>

<button
  style={{
    backgroundColor:
      String(
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ]
      ) === String(matchup.team2.rosterId)
        ? "green"
        : "#1f2937",
    color: "white",
  }}
  className="w-full text-left p-2 rounded"
  onClick={() =>
    selectWinner(
      weekData.week,
      matchup.matchupId,
      matchup.team2.rosterId
    )
  }
>
  {matchup.team2.team}
</button>
              </div>
            )
          )}
        </div>
      ))}
<div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Projected Standings
        </h2>

        <div className="space-y-2">
          {projectedStandings.map(
            (team, index) => (
              <div
                key={team.rosterId}
                className="border border-gray-700 rounded p-2"
              >
                {index + 1}. {team.team} (
                {team.wins}-{team.losses})
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
