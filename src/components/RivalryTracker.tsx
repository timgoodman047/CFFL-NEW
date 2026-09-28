const rivalries = [
{
teamA: "Danny",
teamB: "Tim",
record: "19-15",
playoffRecord: "2-1",
longestStreak: "Danny (6)"
},
 
{
teamA: "Brian",
teamB: "Jason",
record: "16-6",
playoffRecord: "3-0",
longestStreak: "Brian (7)"
},
 
{
teamA: "Nick",
teamB: "Matt",
record: "8-5",
playoffRecord: "1-0",
longestStreak: "Nick (3)"
},
 
{
teamA: "Chris",
teamB: "Tom",
record: "13-9",
playoffRecord: "1-1",
longestStreak: "Chris (4)"
},
 
{
teamA: "Spencer",
teamB: "Jeff",
record: "4-3",
playoffRecord: "0-0",
longestStreak: "Jeff (2)"
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
key={`${rivalry.teamA}-${rivalry.teamB}`}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>
{rivalry.teamA} vs {rivalry.teamB}
</strong>
 
<br />
 
All-Time Record: {rivalry.record}
 
<br />
 
Playoff Record: {rivalry.playoffRecord}
 
<br />
 
Longest Win Streak: {rivalry.longestStreak}
</div>
))}
</div>
);
}
