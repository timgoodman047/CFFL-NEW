import Standings from "../components/Standings";
 
const heroCard = {
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
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
<h1
style={{
color: "#22c55e",
fontSize: "48px",
marginBottom: "5px",
}}
>
Fantasy Football Network
</h1>
 
<p
style={{
color: "#94a3b8",
marginBottom: "20px",
}}
>
League HQ • Anti-PPR Coalition
</p>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(250px, 1fr))",
gap: "20px",
marginBottom: "30px",
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
<p>League Trophy</p>
</div>
</div>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(500px, 1fr))",
gap: "20px",
}}
>
<Standings />
 
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
🚧 Coming Next
</h2>
 
<ul>
<li>📈 Power Rankings</li>
<li>👗 Dress Tracker™</li>
<li>🎯 Weekly Matchups</li>
<li>👤 Owners</li>
<li>🎲 Playoff Odds</li>
<li>📰 League News Network</li>
</ul>
</div>
</div>
</main>
);
}
