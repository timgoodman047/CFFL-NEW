import { history } from "../../../data/history";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

  const season = history.find(
  (s) => s.year === Number(year)
);

if (!season) {
  notFound();
}

const seasons = [...history]
  .map((s) => s.year)
  .sort((a, b) => a - b);

const currentIndex =
  seasons.indexOf(Number(year));

const previousYear =
  currentIndex > 0
    ? seasons[currentIndex - 1]
    : null;

const nextYear =
  currentIndex < seasons.length - 1
    ? seasons[currentIndex + 1]
    : null;

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
        🏆 {season.year} Season Review
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "24px",
        }}
      >
        {season.storyline}
      </p>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
  }}
>
  <div>
    {previousYear && (
      <Link
        href={`/season/${previousYear}`}
      >
        ← {previousYear}
      </Link>
    )}
  </div>

  <div
  style={{
    background: "#111c2d",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "24px",
  }}
>
  <h2
    style={{
      color: "#22c55e",
      marginBottom: "16px",
    }}
  >
    Season Snapshot
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(200px,1fr))",
      gap: "16px",
    }}
  >
    <StatCard
      label="Champion"
      value={season.champion}
    />

    <StatCard
      label="Runner-Up"
      value={season.runnerUp}
    />

    <StatCard
      label="MVP"
      value={season.mvp}
    />

    <StatCard
      label="Highest Score"
      value={season.highestScore}
    />

    <StatCard
      label="Points Leader"
      value={season.pointsLeader}
    />

    <StatCard
      label="Sacko"
      value={season.sacko}
    />
  </div>
</div>

  <div>
    {nextYear && (
      <Link
        href={`/season/${nextYear}`}
      >
        {nextYear} →
      </Link>
    )}
  </div>
</div>      

      <Section title="Champion">
        {season.champion}
      </Section>

      <Section title="Team Name">
        {season.team}
      </Section>

      <Section title="Runner-Up">
        {season.runnerUp}
      </Section>

      <Section title="MVP">
        {season.mvp}
      </Section>

      <Section title="Highest Weekly Score">
        {season.highestScore}
      </Section>

      <Section title="Championship Result">
        {season.championshipScore}
      </Section>

      <Section title="Points Leader">
        {season.pointsLeader}
      </Section>

      <Section title="Sacko">
        {season.sacko}
      </Section>

      <ListSection
        title="Playoff Results"
        items={[
          ...season.semifinals,
          season.thirdPlaceGame,
          season.championship,
        ]}
      />

      <ListSection
        title="Awards"
        items={season.awards}
      />

      <ListSection
        title="Standings"
        items={season.standings}
      />

      <ListSection
        title="Records"
        items={season.records}
      />

      <Section title="Notes">
        {season.notes}
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#111c2d",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          color: "#22c55e",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

function ListSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div
      style={{
        background: "#111c2d",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          color: "#22c55e",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#1b2a40",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        background: "#1b2a40",
        padding: "16px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#22c55e",
        }}
      >
        {value}
      </div>
    </div>
  );
}
