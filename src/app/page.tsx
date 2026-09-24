import Hero from "../components/Hero";
import Standings from "../components/Standings";
import Matchups from "../components/Matchups";
import PowerRankings from "../components/PowerRankings";
import DressTracker from "../components/DressTracker";
import Owners from "../components/Owners";
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
{/* Page Header */}
 
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
}}
>
League HQ • Anti-PPR Coalition
</p>
</div>
 
{/* Hero Cards */}
 
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
<News />
</div>
 
{/* Footer Sections */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",
gap: "20px",
marginTop: "24px",
}}
>
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
padding: "10px",
borderRadius: "8px",
}}
>
2026 Champion — TBD
</div>
</div>
 
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
padding: "10px",
borderRadius: "8px",
marginBottom: "8px",
}}
>
2 Keepers Allowed
</div>
 
<div
style={{
background: "#1b2a40",
padding: "10px",
borderRadius: "8px",
}}
>
Dress Punishment Active
</div>
</div>
 
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
padding: "10px",
borderRadius: "8px",
}}
>
Coming Soon
</div>
</div>
</div>
</main>
);
}
