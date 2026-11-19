import Link from "next/link";
import { franchises } from "../../data/franchises";

export default function HallOfFamePage() {
  const rankings = [...franchises]
    .map((franchise) => ({
      ...franchise,
      hofScore:
        franchise.championships.length * 100 +
        franchise.playoffTrips * 5 +
        franchise.winningPct * 100,
    }))
    .sort((a, b) => b.hofScore - a.hofScore);

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <h1
        style={{
          color: "#22c55e",
          fontSize: "48px",
          marginBottom: "24px",
        }}
      >
        🏆 CFFL Hall of Fame
      </h1>

      {rankings.map((franchise, index) => (
        <Link
          key={franchise.slug}
          href={`/franchise/${franchise.slug}`}
          style={{
            display: "block",
            background: "#111c2d",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "12px",
            textDecoration: "none",
            color: "white",
          }}
        >
          <h2>
            #{index + 1} {franchise.owner}
          </h2>

          <p>
            🏆 Championships:{" "}
            {franchise.championships.length}
          </p>

          <p>
            🎯 Playoff Trips:{" "}
            {franchise.playoffTrips}
          </p>

          <p>
            📈 Winning Percentage:{" "}
            {(franchise.winningPct * 100).toFixed(1)}%
          </p>

          <p>
            ⭐ HOF Score:{" "}
            {franchise.hofScore.toFixed(1)}
          </p>
        </Link>
      ))}
    </main>
  );
}
