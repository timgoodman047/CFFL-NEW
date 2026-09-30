export default function DashboardPage() {
return (
<main
style={{
maxWidth: "1400px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
fontSize: "42px",
marginBottom: "24px",
}}
>
📊 League Dashboard
</h1>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(300px,1fr))",
gap: "20px",
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
marginTop: 0,
}}
>
🏆 Championship Favorite
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
See Monte Carlo Simulator
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
Current championship
leader based on
10,000 simulations.
</p>
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
marginTop: 0,
}}
>
🎯 Playoff Picture
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Bubble Watch
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
Review projected seeds
and playoff odds.
</p>
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
marginTop: 0,
}}
>
💀 Sacko Race
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Bottom Watch
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
Track teams in danger
of finishing last.
</p>
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
marginTop: 0,
}}
>
📺 Live Center
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Live Matchups
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
View live scores,
blowouts and win
probabilities.
</p>
 
<div
style={{
marginTop: "12px",
color: "#22c55e",
fontWeight: "bold",
}}
>
/live
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
marginTop: 0,
}}
>
⚔️ Team Comparison
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Franchise Battle
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
Compare league
franchises side-by-side.
</p>
 
<div
style={{
marginTop: "12px",
color: "#22c55e",
fontWeight: "bold",
}}
>
/team-compare
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
marginTop: 0,
}}
>
📚 League History
</h2>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Records & History
</div>
 
<p
style={{
color: "#94a3b8",
}}
>
Browse champions,
records and rivalries.
</p>
</div>
</div>
</main>
);
}
