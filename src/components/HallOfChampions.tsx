import Link from "next/link";
import { history } from "../data/history";

export default function HallOfChampions() {
  const champions = history;

  return (
    <div
      style={{
        background: "#111c2d",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2
        style={{
          color: "#22c55e",
        }}
      >
        🏆 Hall Of Champions
      </h2>

      {champions.map((season) => (
        <Link
          key={season.year}
          href={`/season/${season.year}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              background: "#1b2a40",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <strong>
              🏆 {season.year}
            </strong>

            <br />

            Champion: {season.champion}

            <br />

            <span
              style={{
                color: "#22c55e",
                fontSize: "14px",
              }}
            >
              View Season →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
