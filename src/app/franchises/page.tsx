import Link from "next/link";
import { franchises } from "../../data/franchises";

export default function FranchisesPage() {
  return (
    <main
      style={{
        maxWidth: "1400px",
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
        🏆 Franchise Directory
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {franchises.map((franchise) => (
          <Link
            key={franchise.slug}
            href={`/franchise/${franchise.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#111c2d",
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <h2
                style={{
                  color: "#22c55e",
                  marginBottom: "12px",
                }}
              >
                {franchise.owner}
              </h2>

              <div>🏆 Championships: {franchise.championships.length}</div>

              <div>🎯 Playoff Trips: {franchise.playoffTrips}</div>

              <div>
                📈 Win %: {(franchise.winningPct * 100).toFixed(1)}%
              </div>

              <div style={{ marginTop: "12px", color: "#94a3b8" }}>
                View Franchise →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
