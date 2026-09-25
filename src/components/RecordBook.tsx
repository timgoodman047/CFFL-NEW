export default function RecordBook() {
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
📊 Record Book
</h2>
 
<div style={card}>
Highest Weekly Score
</div>
 
<div style={card}>
Most Points For
</div>
 
<div style={card}>
Longest Win Streak
</div>
 
<div style={card}>
Biggest Blowout
</div>
</div>
);
}
 
const card = {
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "8px",
};
