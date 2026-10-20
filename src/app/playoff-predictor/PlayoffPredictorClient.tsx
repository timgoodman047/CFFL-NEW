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

  function pickWinner(
    week: number,
    matchupId: number,
    rosterId: number
  ) {
    setPicks((prev) => ({
      ...prev,
      [`${week}-${matchupId}`]: rosterId,
    }));
  }

  return (
    <div className="space-y-8">
      {schedule.map((weekData) => (
        <div key={weekData.week}>
          <h2 className="text-2xl font-bold mb-4">
            Week {weekData.week}
          </h2>

          {weekData.matchups.map(
            (matchup: any, index: number) => (
              <div
                key={index}
                className="border border-gray-700 rounded p-4 mb-3"
              >
                <button
                  className={`block w-full text-left p-2 rounded ${
                    picks[
                      `${weekData.week}-${matchup.matchupId}`
                    ] === matchup.team1.rosterId
                      ? "bg-green-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() =>
                    pickWinner(
                      weekData.week,
                      matchup.matchupId,
                      matchup.team1.rosterId
                    )
                  }
                >
                  {matchup.team1.team}
                </button>

                <div className="text-center my-2">
                  vs
                </div>

                <button
                  className={`block w-full text-left p-2 rounded ${
                    picks[
                      `${weekData.week}-${matchup.matchupId}`
                    ] === matchup.team2.rosterId
                      ? "bg-green-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() =>
                    pickWinner(
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
    </div>
  );
}
