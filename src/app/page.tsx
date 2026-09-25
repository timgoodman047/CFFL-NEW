import Hero from "../components/Hero";
import Standings from "../components/Standings";
import Matchups from "../components/Matchups";
import PowerRankings from "../components/PowerRankings";
import DressTracker from "../components/DressTracker";
import Owners from "../components/Owners";
import PlayoffOdds from "../components/PlayoffOdds";
import WeeklyAwards from "../components/WeeklyAwards";
import News from "../components/News";
import HallOfChampions from "../components/HallOfChampions";
import DynastyRankings from "../components/DynastyRankings";
import RecordBook from "../components/RecordBook";
 
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
<div style={{ marginBottom: "24px" }}>
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
 
<PowerRankings />
<DressTracker />
 
<Owners />
<PlayoffOdds />
 
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
 
<RecordBook />
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
 
<div style={itemStyle}>
Dress Punishment Active
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
Franchise Profile Pages
</div>
 
<div style={itemStyle}>
Rivalry Tracker
</div>
 
<div style={itemStyle}>
Monte Carlo Playoff Simulator
</div>
 
<div style={itemStyle}>
Championship Odds
</div>
 
<div style={itemStyle}>
Sacko Probability
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
</div>
</div>
</main>
);
}
