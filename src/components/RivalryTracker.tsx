const rivalries = [
{
rivals: "Danny vs Tim",
record: "19-15",
playoffRecord: "2-1",
streak: "Danny (6)"
},
 
{
rivals: "Tim vs Spencer",
record: "18-6",
playoffRecord: "3-0",
streak: "Tim (8)"
},
 
{
rivals: "Chris vs Tom",
record: "13-9",
playoffRecord: "1-1",
streak: "Chris (4)"
},
 
{
rivals: "Brian vs Jason",
record: "16-6",
playoffRecord: "3-0",
streak: "Brian (7)"
},
 
{
rivals: "Nick vs Matt",
record: "8-5",
playoffRecord: "1-0",
streak: "Nick (3)"
}
];
 
export default function RivalryTracker() {
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
⚔️ Rivalry Tracker
</h2>
 
{rivalries.map((rivalry) => (
<div
key={rivalry.rivals}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>
{rivalry.rivals}
</strong>
 
<br />
 
All-Time Record:
{" "}
{rivalry.record}
 
<br />
 
Playoff Record:
{" "}
{rivalry.playoffRecord}
 
<br />
 
Longest Streak:
{" "}
{rivalry.streak}
</div>
))}
</div>
);
}
