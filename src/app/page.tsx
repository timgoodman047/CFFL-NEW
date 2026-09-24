export default function Home() {
return (
<main
style={{
maxWidth: "1600px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
fontSize: "48px",
marginBottom: "5px",
}}
>
Fantasy Football Network
</h1>
 
<p style={{ color: "#94a3b8" }}>
League HQ • Anti-PPR Coalition
</p>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "20px",
marginTop: "20px",
}}
>
<div style={heroCard}>
<h2>$1,100</h2>
<p>Champion Prize</p>
</div>
 
<div style={heroCard}>
<h2>$222</h2>
<p>League Buy-In</p>
</div>
 
<div style={heroCard}>
<h2>10</h2>
<p>Teams</p>
</div>
 
<div style={heroCard}>
<h2>🏆</h2>
<p>Trophy</p>
</div>
</div>
 
<h2
style={{
marginTop: "40px",
color: "#22c55e",
}}
>
Coming Next
</h2>
 
<ul>
<li>🏆 Live Standings</li>
<li>📈 Power Rankings</li>
<li>👗 Dress Tracker™</li>
<li>🎯 Weekly Matchups</li>
<li>🎲 Playoff Odds</li>
</ul>
</main>
);
}
 
const heroCard = {
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
};
