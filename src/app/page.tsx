import Link from "next/link";
import Hero from "../components/Hero";
import Standings from "../components/Standings";
import ExpectedStandings from "../components/ExpectedStandings";
import Matchups from "../components/Matchups";
import PowerRankings from "../components/PowerRankings";
import DressTracker from "../components/DressTracker";
import Owners from "../components/Owners";
import ChampionshipContenders from "../components/ChampionshipContenders";
import PlayoffOdds from "../components/PlayoffOdds";
import ProjectedBracket from "../components/ProjectedBracket";
import PlayoffSimulator from "../components/PlayoffSimulator";
import WeeklyScoreDistributions from "../components/WeeklyScoreDistributions";
import WeeklyAwards from "../components/WeeklyAwards";
import News from "../components/News";
import HallOfChampions from "../components/HallOfChampions";
import DynastyRankings from "../components/DynastyRankings";
import FranchiseProfiles from "../components/FranchiseProfiles";
import RecordBook from "../components/RecordBook";
import SeasonBrowser from "../components/SeasonBrowser";
import RivalryTracker from "../components/RivalryTracker";
 
const cardStyle = {
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
};
 
const itemStyle = {
  background: "#1b2a40",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "8px",
};

export default function Home() {
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
marginBottom: "24px",
}}
>
<h1
style={{
color: "#22c55e",
fontSize: "48px",
marginBottom: "8px",
}}
>
Fantasy Football Network
</h1>
 
<p
style={{
color: "#94a3b8",
margin: 0,
}}
>
League HQ • Anti-PPR Coalition
</p>
</div>
 
<Hero />
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(500px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
<Standings />
<Matchups />

<div style={cardStyle}>
<h2 style={{ color: "#22c55e" }}>
🏈 League Tools
</h2>
 
<div style={itemStyle}>
📺 Live Center
<br />
/live
/live
</Link>
</div>
 
<div style={itemStyle}>
🏈 Rosters
<br />
/rosters
/rosters
</Link>
</div>
 
<div style={itemStyle}>
📊 Dashboard
<br />
/dashboard
/dashboard
</Link>
</div>
 
<div style={itemStyle}>
📋 Transactions
<br />
/transactions
/transactions
</Link>
</div>
 
<div style={itemStyle}>
⚔️ Team Compare
<br />
/team-compare
/team-compare
</Link>
</div>
</div>
 
<PowerRankings />
<DressTracker />
<Owners />

<PlayoffOdds />
<PlayoffSimulator />
<ProjectedBracket />
 
<ExpectedStandings />
<ChampionshipContenders />
<WeeklyScoreDistributions />
 
<WeeklyAwards />
<News />
</div>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(450px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
<HallOfChampions />
<DynastyRankings />
 
<FranchiseProfiles />
<RecordBook />
 
<SeasonBrowser />
<RivalryTracker />
</div>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
<div style={cardStyle}>
<h2 style={{ color: "#22c55e" }}>
📜 Constitution
</h2>
 
<div style={itemStyle}>
2 Keepers Allowed
</div>
 
<div style={itemStyle}>
$222 League Buy-In
</div>
 
<div style={itemStyle}>
$1,100 Champion Prize
</div>
 
<div style={itemStyle}>
Lock Of The Week
</div>

</div>
 
<div style={cardStyle}>
<h2 style={{ color: "#22c55e" }}>
🚀 Coming Soon
</h2>
 
<div style={itemStyle}>
Fully Clickable Franchise Profiles
</div>
 
<div style={itemStyle}>
Weekly Matchup Predictor
</div>
 
<div style={itemStyle}>
League Hall Of Fame
</div>
 
<div style={itemStyle}>
Franchise Analytics
</div>
 
<div style={itemStyle}>
Historical Browser Expansion
</div>
 
<div style={itemStyle}>
Automated Weekly Recaps
</div>
</div>
 
<div style={cardStyle}>
<h2 style={{ color: "#22c55e" }}>
📚 League History
</h2>
 
<div style={itemStyle}>
Founded: 2006
</div>
 
<div style={itemStyle}>
20+ Seasons Tracked
</div>
 
<div style={itemStyle}>
Yahoo Era + Sleeper Era
</div>
 
<div style={itemStyle}>
Historical Records Preserved
</div>
 
<div style={itemStyle}>
All-Time Records: /all-time
</div>
</div>
</div>
</main>
);
}
