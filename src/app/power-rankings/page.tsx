import { powerRankings } from "../../data/powerRankings";

export default function PowerRankingsPage() {
  const movementIcon = (movement: string) => {
    switch (movement) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-2">
        📈 CFFL Power Rankings
      </h1>

      <p className="text-gray-400 mb-8">
        Week {powerRankings.week}
      </p>

      <div className="space-y-4">
        {powerRankings.rankings.map((team) => (
          <div
            key={team.rank}
            className="bg-gray-900 rounded-xl p-5 border border-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">
                #{team.rank} {team.team}
              </h2>

              <span className="text-xl">
                {movementIcon(team.movement)}
              </span>
            </div>

            <div className="text-sm text-green-400 mb-3">
              {team.tier}
            </div>

            <p className="text-gray-300">
              {team.blurb}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
