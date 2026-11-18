import { history } from "../../../data/history";
import { notFound } from "next/navigation";

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
