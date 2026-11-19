import Link from "next/link";
import { history } from "../../data/history";

export default function SeasonsPage() {
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
          marginBottom: "24px",
        }}
      >
        🏆 CFFL Seasons
      </h1>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {history.map((season) => (
          <Link
            key={season.year}
            href={`/season/${season.year}`}
            style={{
              background: "#111c2d",
              padding: "16px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <strong>{season.year}</strong>

            <div
              style={{
                color: "#22c55e",
                marginTop: "4px",
              }}
            >
              Champion: {season.champion}
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              {season.team}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
