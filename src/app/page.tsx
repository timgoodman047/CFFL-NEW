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
 
export default function Home() {
return (
<main
style={{
maxWidth: "1600px",
margin: "0 auto",
padding: "24px",
}}
>
{/* Header */}
 
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
 
{/* Hero */}
 
<Hero />
 
{/* Main Dashboard */}
 
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
 
{/* Legacy / History Section */}
 
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
</div>
 
{/* Footer Cards */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
{/* Constitution */}
 
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
📜 Constitution
</h2>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
2 Keepers Allowed
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
$222 League Buy-In
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
$1,100 Championship Prize
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
Dress Punishment Active
</div>
</div>
 
{/* Record Book */}
 
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
📊 Record Book
</h2>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
Highest Weekly Score
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
Highest Playoff Score
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
Most Points For Season
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
Longest Winning Streak
</div>
</div>
 
{/* Future Feature Card */}
 
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
🚀 Coming Soon
</h2>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
True Monte Carlo Playoff Simulator
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
Championship Odds
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
Sacko Odds
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
Franchise Pages
</div>
</div>
</div>
</main>
);
}
