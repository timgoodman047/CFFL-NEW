"use client";

import { useState } from "react";

export default function PlayoffPredictorClient({
  schedule,
}: {
  schedule: any[];
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

console.log("PICKS", picks);
  
  return (
    <div>
      <pre className="mb-4 text-xs">
  {JSON.stringify(picks, null, 2)}
</pre>
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
    backgroundColor: "red",
    color: "white",
  }}
>
  {matchup.team1.team}
</button>

<div className="text-xs text-yellow-500">
  Selected:
  {JSON.stringify(
    picks[
      `${weekData.week}-${matchup.matchupId}`
    ]
  )}
</div>               

<div className="text-xs text-blue-500">
  Team1:
  {String(matchup.team1.rosterId)}
</div>

<div className="text-xs text-green-500">
  Team2:
  {String(matchup.team2.rosterId)}
</div>

<div className="text-gray-500 my-2 text-center">
  vs
</div>

                <button
  style={{
    backgroundColor: "red",
    color: "white",
  }}
>
  {matchup.team2.team}
</button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
