import HallOfChampions from "../../components/HallOfChampions";
import DynastyRankings from "../../components/DynastyRankings";
import FranchiseProfiles from "../../components/FranchiseProfiles";
import RecordBook from "../../components/RecordBook";
import SeasonBrowser from "../../components/SeasonBrowser";
import RivalryTracker from "../../components/RivalryTracker";

export default function MuseumPage() {
  return (
    <main
      style={{
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            color: "#22c55e",
            fontSize: "48px",
            marginBottom: "8px",
          }}
        >
          🏛️ CFFL Museum
        </h1>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Preserving the complete history of the Cosines Fantasy Football League
        </p>
        <div
  style={{
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>
  <a
    href="/season/2025"
    style={{
      background: "#22c55e",
      color: "#111827",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Latest Champion
  </a>

  <a
    href="/season/2019"
    style={{
      background: "#1b2a40",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Tim's Championship Season
  </a>
</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "20px",
        }}
      >
        <HallOfChampions />
        <DynastyRankings />
        <FranchiseProfiles />
        <RecordBook />
        <SeasonBrowser />
        <RivalryTracker />
      </div>
    </main>
  );
}
