import { franchises } from "../../../data/franchises";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function FranchisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const franchise = franchises.find(
    (f) => f.slug === slug
  );

  if (!franchise) {
    notFound();
  }

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
          marginBottom: "8px",
        }}
      >
        {franchise.name}
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "24px",
        }}
      >
        {franchise.bio}
      </p>

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
          Trophy Case
        </h2>

<div
  style={{
    marginBottom: "16px",
    color: "#94a3b8",
  }}
>
  Championship Seasons
</div>

        <p>
          Championships:{" "}
          {franchise.championships.length}
        </p>

<p>
  Seasons Active: {franchise.yearsActive}
</p>

<p>
  Championship Rate:{" "}
  {(
    (franchise.championships.length /
      franchise.yearsActive) *
    100
  ).toFixed(1)}
  %
</p>        

        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "12px",
    marginTop: "16px",
  }}
>
  {franchise.championships
    .sort((a, b) => b - a)
    .map((year) => (
      <Link
  key={year}
  href={`/season/${year}`}
  style={{
    background:
      "linear-gradient(135deg,#d4af37,#f7e27c)",
    color: "#111",
    padding: "16px",
    borderRadius: "12px",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,.25)",
    textDecoration: "none",
    display: "block",
  }}
>
        <div style={{ fontSize: "32px" }}>
          🏆
        </Link>

        <div>{year}</div>

        <div
          style={{
            fontSize: "12px",
            opacity: 0.75,
          }}
        >
          Champion
        </div>
      </div>
    ))}
</div>
      </div>
    </main>
  );
}
