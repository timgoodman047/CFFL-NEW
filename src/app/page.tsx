import Hero from "../components/Hero";
import Standings from "../components/Standings";
import Matchups from "../components/Matchups";
import PowerRankings from "../components/PowerRankings";
import DressTracker from "../components/DressTracker";
import Owners from "../components/Owners";
import PlayoffOdds from "../components/PlayoffOdds";
import News from "../components/News";
 
export default function Home() {
return (
<main
style={{
maxWidth: "1600px",
margin: "0 auto",
padding: "24px",
}}
>
{/* Site Header */}
 
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
 
{/* Hero Banner */}
 
<Hero />
 
{/* Main Dashboard Grid */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(500px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
{/* Row 1 */}
<Standings />
<Matchups />
 
{/* Row 2 */}
<PowerRankings />
<DressTracker />
 
{/* Row 3 */}
<Owners />
<PlayoffOdds />
</div>
 
{/* News Section */}
 
<div
style={{
marginTop: "24px",
}}
>
<News />
</div>
 
{/* Bottom Row */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
{/* Hall of Champions */}
 
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
🏆 Hall of Champions
</h2>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
2026 Champion — TBD
</div>
</div>
 
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
Most Points
