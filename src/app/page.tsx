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
 
{/* LEAGUE OVERVIEW */}
 
<h2
style={{
color: "#22c55e",
marginTop: "32px",
marginBottom: "16px",
}}
>
📊 League Overview
</h2>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
}}
>
<Standings />
 
<Matchups />
 
<div style={cardStyle}>
<h2
style={{
color: "#22c55e",
}}
>
🏈 League Tools
</h2>
 
<Link href="/live">
  <div style={itemStyle}>
📺 Live Center
    <br />
    /live
  </div>
</Link>

<Link href="/schedule">
  <div style={itemStyle}>
📅 Schedule
    <br />
    /schedule
  </div>
</Link>

 <Link href="/playoff-machine">
  <div style={itemStyle}>
🧮 Playoff Machine
    <br />
    /playoff-machine
  </div>
</Link> 
 
<Link href="/rosters">
  <div style={itemStyle}>
🏈 Rosters
    <br />
    /rosters
  </div>
</Link>
 
<Link href="/dashboard">
  <div style={itemStyle}>
📊 Dashboard
    <br />
    /dashboard
  </div>
</Link>
 
<Link href="/transactions">
  <div style={itemStyle}>
📋 Transactions
    <br />
    /transactions
  </div>
</Link>
 
<Link href="/team-compare">
  <div style={itemStyle}>
⚔️ Team Compare
    <br />
    /team-compare
  </div>
</Link>
</div>
</div>
 
{/* ANALYTICS */}
 
<h2
style={{
color: "#22c55e",
marginTop: "32px",
marginBottom: "16px",
}}
>
📈 Analytics
</h2>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
}}
>
<PowerRankings />
<DressTracker />
 
<div style={cardStyle}>
<h2
style={{
color: "#22c55e",
}}
>
👤 Owners
</h2>
 
<div style={itemStyle}>
TimGoodman
<br />
Red Kingdom
<br />
/team/tim
</div>
</div>
</div>
 
{/* SIMULATION CENTER */}
 
<h2
style={{
color: "#22c55e",
marginTop: "32px",
marginBottom: "16px",
}}
>
🎲 Simulation Center
</h2>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
}}
>
<PlayoffOdds />
<PlayoffSimulator />
<ProjectedBracket />
</div>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
marginTop: "20px",
}}
>
<ExpectedStandings />
<ChampionshipContenders />
<WeeklyScoreDistributions />
</div>
 
{/* LEAGUE COVERAGE */}
 
<h2
style={{
color: "#22c55e",
marginTop: "32px",
marginBottom: "16px",
}}
>
📰 League Coverage
</h2>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
}}
>
<WeeklyAwards />
<News />
</div>
 
{/* HISTORY */}
 
<h2
style={{
color: "#22c55e",
marginTop: "32px",
marginBottom: "16px",
}}
>
📚 League History
</h2>
 
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
 
{/* INFO */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(3, 1fr)",
gap: "20px",
marginTop: "24px",
}}
>
<div style={cardStyle}>
<h2
style={{
color: "#22c55e",
}}
>
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
<h2
style={{
color: "#22c55e",
}}
>
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
<h2
style={{
color: "#22c55e",
}}
>
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
