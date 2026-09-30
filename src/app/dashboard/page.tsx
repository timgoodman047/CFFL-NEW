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
<h2 style={{ color: "#22c55e" }}>
🏆 Championship Favorite
</h2>
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Championship Contenders
</div>
<p style={{ color: "#94a3b8" }}>
View current title odds from
the Monte Carlo simulator.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
📈 Power Rankings
</h2>
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Live Rankings
</div>
<p style={{ color: "#94a3b8" }}>
Generated from current
Sleeper league data.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
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
<p style={{ color: "#94a3b8" }}>
Follow teams at risk of last
place.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
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
<p style={{ color: "#94a3b8" }}>
Scores, blowouts and win
probability.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
🏈 Rosters
</h2>
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
League Rosters
</div>
<p style={{ color: "#94a3b8" }}>
Position-grouped roster
breakdowns.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
📋 Transactions
</h2>
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Activity Feed
</div>
<p style={{ color: "#94a3b8" }}>
Free agents, waivers and
trades.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
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
<p style={{ color: "#94a3b8" }}>
Compare teams side-by-side.
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2 style={{ color: "#22c55e" }}>
📚 League History
</h2>
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
Historical Records
</div>
<p style={{ color: "#94a3b8" }}>
Records, rivals and
champions.
</p>
</div>
</div>
</main>
);
}
