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
<div
  style={{
    background: "#111c2d",
    padding: "28px",
    borderRadius: "16px",
    marginBottom: "32px",
  }}
>
  <h1
    style={{
      color: "#22c55e",
      fontSize: "48px",
      marginBottom: "10px",
    }}
  >
    🏛️ CFFL Museum
  </h1>

  <p
    style={{
      color: "#94a3b8",
      marginBottom: "24px",
    }}
  >
    Preserving the complete history of the Cosines Fantasy Football League
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(180px,1fr))",
      gap: "16px",
    }}
  >
    <HeroStat label="Founded" value="2006" />
    <HeroStat label="Seasons" value="19" />
    <HeroStat label="Champions" value="8" />
    <HeroStat label="Record Score" value="209.2" />
  </div>

  <div
    style={{
      background: "#1b2a40",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "24px",
    }}
  >
    <div
      style={{
        color: "#94a3b8",
        marginBottom: "8px",
      }}
    >
      Defending Champion
    </div>

    <div
      style={{
        color: "#22c55e",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      Chris
    </div>

    <div>
      Short Board Champ
    </div>
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
function HeroStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#1b2a40",
        padding: "18px",
        borderRadius: "12px",
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
          color: "#22c55e",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
