"use client";

import { useEffect, useState } from "react";

function getAverage(scores: number[]) {
  return (
    scores.reduce(
      (sum, score) => sum + score,
      0
    ) / scores.length
  );
}

function getStdDev(scores: number[]) {
  const avg = getAverage(scores);

  const variance =
    scores.reduce(
      (sum, score) =>
        sum +
        Math.pow(score - avg, 2),
      0
    ) / scores.length;

  return Math.sqrt(variance);
}

function randomNormal() {
  let u = 0;
  let v = 0;

  while (u === 0) {
    u = Math.random();
  }

  while (v === 0) {
    v = Math.random();
  }

  return (
    Math.sqrt(-2 * Math.log(u)) *
    Math.cos(2 * Math.PI * v)
  );
}

export default function PlayoffPredictorClient({
  schedule,
  standings,
  scoringHistory,
}: {
  schedule: any[];
  standings: any[];
  scoringHistory: Record<number, number[]>;
}) {
  
const [picks, setPicks] = useState<
  Record<string, number>
>({});

const [projectedScores, setProjectedScores] =
  useState<
    Record<
      string,
      {
        team1: number;
        team2: number;
      }
    >
  >({})

 function selectWinner(
  week: number,
  matchupId: number,
  rosterId: number
) {
  const matchup = schedule
    .find((w) => w.week === week)
    ?.matchups.find(
      (m: any) =>
        m.matchupId === matchupId
    );

  if (!matchup) return;

  const team1 = standings.find(
    (t) =>
      t.rosterId ===
      matchup.team1.rosterId
  );

  const team2 = standings.find(
    (t) =>
      t.rosterId ===
      matchup.team2.rosterId
  );

  if (!team1 || !team2) return;

  const team1Scores =
    scoringHistory[
      team1.rosterId
    ] || [];

  const team2Scores =
    scoringHistory[
      team2.rosterId
    ] || [];

  const team1Avg =
    team1Scores.length > 0
      ? getAverage(team1Scores)
      : 0;

  const team2Avg =
    team2Scores.length > 0
      ? getAverage(team2Scores)
      : 0;

  const team1Std =
    team1Scores.length > 0
      ? getStdDev(team1Scores)
      : 0;

  const team2Std =
    team2Scores.length > 0
      ? getStdDev(team2Scores)
      : 0;

  let team1Score =
    team1Avg +
    randomNormal() * team1Std;

  let team2Score =
    team2Avg +
    randomNormal() * team2Std;

  if (
  rosterId ===
  matchup.team1.rosterId
) {
  if (team1Score < team2Score) {
    const temp = team1Score;
    team1Score = team2Score;
    team2Score = temp;
  }
} else {
  if (team2Score < team1Score) {
    const temp = team2Score;
    team2Score = team1Score;
    team1Score = temp;
  }
}

  setProjectedScores((prev) => ({
    ...prev,
    [`${week}-${matchupId}`]: {
      team1: team1Score,
      team2: team2Score,
    },
  }));

  setPicks((prev) => ({
    ...prev,
    [`${week}-${matchupId}`]: rosterId,
  }));
}

  const projectedStandings = standings.map(
  (team) => {
    const scores =
      scoringHistory[team.rosterId] || [];

    return {
      ...team,
      projectedWins: team.wins,
      projectedLosses: team.losses,
      projectedPF: team.pf,

      avgPPG:
        scores.length > 0
          ? getAverage(scores)
          : 0,

      stdDev:
        scores.length > 0
          ? getStdDev(scores)
          : 0,
    };
  }
);

const currentPlayoffTeams = standings
  .slice()
  .sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }

    return b.pf - a.pf;
  })
  .slice(0, 6)
  .map((team) => team.rosterId);

const projectedPlayoffRosterIds =
  projectedStandings
    .slice()
    .sort((a, b) => {
      if (
        b.projectedWins !==
        a.projectedWins
      ) {
        return (
          b.projectedWins -
          a.projectedWins
        );
      }

      return (
        b.projectedPF -
        a.projectedPF
      );
    })
    .slice(0, 6)
    .map((team) => team.rosterId);

const teamsEnteringPlayoffs =
  projectedStandings.filter(
    (team) =>
      projectedPlayoffRosterIds.includes(
  team.rosterId
      ) &&
      !currentPlayoffTeams.includes(
        team.rosterId
      )
  );

const teamsLeavingPlayoffs =
  projectedStandings.filter(
    (team) =>
      !projectedPlayoffRosterIds.includes(
  team.rosterId
      ) &&
      currentPlayoffTeams.includes(
        team.rosterId
      )
  );

function autoPickByRecord() {
  const newPicks: Record<
    string,
    number
  > = {};

const newProjectedScores: Record<
  string,
  {
    team1: number;
    team2: number;
  }
> = {};

  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );

        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );

        if (!team1 || !team2) return;

const winner =
  team1.wins >= team2.wins
    ? matchup.team1.rosterId
    : matchup.team2.rosterId;

const team1Scores =
  scoringHistory[team1.rosterId] || [];

const team2Scores =
  scoringHistory[team2.rosterId] || [];

let team1Score =
  (team1Scores.length > 0
    ? getAverage(team1Scores)
    : 0) +
  randomNormal() *
    (team1Scores.length > 0
      ? getStdDev(team1Scores)
      : 0);

let team2Score =
  (team2Scores.length > 0
    ? getAverage(team2Scores)
    : 0) +
  randomNormal() *
    (team2Scores.length > 0
      ? getStdDev(team2Scores)
      : 0);

if (winner === matchup.team1.rosterId) {
  if (team1Score < team2Score) {
    const temp = team1Score;
    team1Score = team2Score;
    team2Score = temp;
  }
} else {
  if (team2Score < team1Score) {
    const temp = team2Score;
    team2Score = team1Score;
    team1Score = temp;
  }
}

newProjectedScores[
  `${weekData.week}-${matchup.matchupId}`
] = {
  team1: team1Score,
  team2: team2Score,
};

newPicks[
  `${weekData.week}-${matchup.matchupId}`
] = winner;                
      }
    );
  });

  setPicks(newPicks);
setProjectedScores(
  newProjectedScores
);
}
  
function autoPickByPF() {
  const newPicks: Record<
    string,
    number
  > = {};

  const newProjectedScores: Record<
    string,
    {
      team1: number;
      team2: number;
    }
  > = {};

  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );

        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );

        if (!team1 || !team2) return;

  const winner =
  team1.pf >= team2.pf
    ? matchup.team1.rosterId
    : matchup.team2.rosterId;

const team1Scores =
  scoringHistory[team1.rosterId] || [];

const team2Scores =
  scoringHistory[team2.rosterId] || [];

let team1Score =
  (team1Scores.length > 0
    ? getAverage(team1Scores)
    : 0) +
  randomNormal() *
    (team1Scores.length > 0
      ? getStdDev(team1Scores)
      : 0);

let team2Score =
  (team2Scores.length > 0
    ? getAverage(team2Scores)
    : 0) +
  randomNormal() *
    (team2Scores.length > 0
      ? getStdDev(team2Scores)
      : 0);

if (winner === matchup.team1.rosterId) {
  if (team1Score < team2Score) {
    const temp = team1Score;
    team1Score = team2Score;
    team2Score = temp;
  }
} else {
  if (team2Score < team1Score) {
    const temp = team2Score;
    team2Score = team1Score;
    team1Score = temp;
  }
}

newProjectedScores[
  `${weekData.week}-${matchup.matchupId}`
] = {
  team1: team1Score,
  team2: team2Score,
};

newPicks[
  `${weekData.week}-${matchup.matchupId}`
] = winner;      
      }
    );
  });

  setPicks(newPicks);
setProjectedScores(
  newProjectedScores
);
}

function autoPickProjectedWinner() {
  const newPicks: Record<
    string,
    number
  > = {};

  const newProjectedScores: Record<
    string,
    {
      team1: number;
      team2: number;
    }
  > = {};

  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );


        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );


        if (!team1 || !team2) return;


        const team1Scores =
  scoringHistory[team1.rosterId] || [];

const team2Scores =
  scoringHistory[team2.rosterId] || [];

const team1Avg =
  team1Scores.length > 0
    ? getAverage(team1Scores)
    : 0;

const team2Avg =
  team2Scores.length > 0
    ? getAverage(team2Scores)
    : 0;

const team1Std =
  team1Scores.length > 0
    ? getStdDev(team1Scores)
    : 0;

const team2Std =
  team2Scores.length > 0
    ? getStdDev(team2Scores)
    : 0;

const team1Score =
  team1Avg +
  randomNormal() * team1Std;

const team2Score =
  team2Avg +
  randomNormal() * team2Std;

newProjectedScores[
  `${weekData.week}-${matchup.matchupId}`
] = {
  team1: team1Score,
  team2: team2Score,
};

        const winner =
          team1Score >= team2Score
            ? matchup.team1.rosterId
            : matchup.team2.rosterId;

        newPicks[
          `${weekData.week}-${matchup.matchupId}`
        ] = winner;
      }
    );
  });
  
  setPicks(newPicks);
setProjectedScores(
  newProjectedScores
);
}

schedule.forEach((weekData) => {
  weekData.matchups.forEach(
    (matchup: any) => {
      const winner =
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ];

      if (!winner) return;


      const loser =
        winner ===
        matchup.team1.rosterId
          ? matchup.team2.rosterId
          : matchup.team1.rosterId;


      const winnerTeam =
        projectedStandings.find(
          (t) =>
            t.rosterId === winner
        );


      const loserTeam =
        projectedStandings.find(
          (t) =>
            t.rosterId === loser
        );


      if (winnerTeam) {
  winnerTeam.projectedWins++;

  const winnerProjection =
  winnerTeam.avgPPG +
  winnerTeam.stdDev * 0.5;

  winnerTeam.projectedPF += winnerProjection;
}

if (loserTeam) {
  loserTeam.projectedLosses++;

  const loserProjection =
  loserTeam.avgPPG -
  loserTeam.stdDev * 0.5;

  loserTeam.projectedPF += loserProjection;
}
  }
  );
});

projectedStandings.sort(
  (a, b) => {
    if (
      b.projectedWins !==
      a.projectedWins
    ) {
      return (
        b.projectedWins -
        a.projectedWins
      );
    }

    return b.projectedPF - a.projectedPF;
  }
);

const topFive = [...projectedStandings]
  .slice(0, 5);

const wildcard = projectedStandings
  .slice(5)
  .sort(
    (a, b) =>
      b.projectedPF -
      a.projectedPF
  )[0];

const projectedPlayoffTeams = [
  ...topFive,
  wildcard,
].filter(Boolean);
  
  return (
  <div>
    <div className="mb-6 flex gap-3 flex-wrap">
  <button
  onClick={() => {
    setPicks({});
    setProjectedScores({});
  }}
  className="px-4 py-2 rounded bg-red-600 text-white"
>
  Reset Scenario
</button>

  <button
    onClick={autoPickByRecord}
    className="px-4 py-2 rounded bg-blue-600 text-white"
  >
    Auto Pick By Record
  </button>


  <button
    onClick={autoPickByPF}
    className="px-4 py-2 rounded bg-green-600 text-white"
  >
    Auto Pick By PF
  </button>


  <button
    onClick={autoPickProjectedWinner}
    className="px-4 py-2 rounded bg-purple-600 text-white"
  >
    Auto Pick Projected Winner
  </button>
</div>
      
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

  {projectedScores[
    `${weekData.week}-${matchup.matchupId}`
  ] && (
    <div className="text-sm mt-2">
      {projectedScores[
        `${weekData.week}-${matchup.matchupId}`
      ].team1.toFixed(2)}
      {" - "}
      {projectedScores[
        `${weekData.week}-${matchup.matchupId}`
      ].team2.toFixed(2)}
    </div>
  )}
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
               {index + 1}. {team.team}
({" "}
{team.projectedWins}-
{team.projectedLosses}
{" • PF "}
{team.projectedPF.toFixed(1)}
)
              </div>
            )
          )}
        </div>
      </div>
<div className="mt-10">
<h2 className="text-2xl font-bold mb-4">
Projected Playoff Teams
</h2>
 
{projectedPlayoffTeams.map(
(team, index) => (
<div
key={team.rosterId}
className="border border-gray-700 rounded p-3 mb-2"
>
{index < 5
? `#${index + 1}`
: "⭐ Wildcard"}{" "}
{team.team}{" "}
({team.projectedWins}-
{team.projectedLosses})
</div>
)
)}
</div>
 
<div className="mt-6 rounded border p-4">
<h2 className="mb-3 text-xl font-bold">
Scenario Summary
</h2>

<div>
  Entering: {teamsEnteringPlayoffs.length}
</div>

<div>
  Leaving: {teamsLeavingPlayoffs.length}
</div>
 
<div className="mb-4">
<h3 className="font-semibold text-green-600">
IN
</h3>
 
{teamsEnteringPlayoffs.length === 0 ? (
<div>No changes</div>
) : (
teamsEnteringPlayoffs.map(
(team) => (
<div key={team.rosterId}>
✅ {team.team}
</div>
)
)
)}
</div>
 
<div>
<h3 className="font-semibold text-red-600">
OUT
</h3>
 
{teamsLeavingPlayoffs.length === 0 ? (
<div>No changes</div>
) : (
teamsLeavingPlayoffs.map(
(team) => (
<div key={team.rosterId}>
❌ {team.team}
</div>
)
)
)}
</div>
</div>
 
</div>
);
}
