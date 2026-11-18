import { franchises } from "../../../data/franchises";
import { notFound } from "next/navigation";

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

        <p>
          Championships:{" "}
          {franchise.championships.length}
        </p>

        {franchise.championships.map((year) => (
          <div
            key={year}
            style={{
              background: "#1b2a40",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            🏆 {year}
          </div>
        ))}
      </div>
    </main>
  );
}
