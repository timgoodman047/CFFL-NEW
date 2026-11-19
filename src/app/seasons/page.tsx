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
        🏆 CFFL Season Archive
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
            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              {season.year}
            </div>

            <div
              style={{
                color: "#22c55e",
              }}
            >
              Champion: {season.champion}
            </div>

            <div
              style={{
                color: "#94a3b8",
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
