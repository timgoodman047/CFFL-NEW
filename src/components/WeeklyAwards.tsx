export default function WeeklyAwards() {
return (
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
🏅 Weekly Awards
</h2>
 
<div style={award}>
🔥 Highest Scorer
</div>
 
<div style={award}>
💀 Bad Beat
</div>
 
<div style={award}>
🎯 Bench Blunder
</div>
 
<div style={award}>
🍀 Luckiest Win
</div>
</div>
);
}
 
const award = {
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
};
