export default function RecordBook() {
 
const records = [
 
{
category: "Highest Weekly Score",
value: "209.2",
owner: "Tim",
year: "2021"
},
 
{
category: "Highest Playoff Score",
value: "194.68",
owner: "Tim",
year: "2019"
},
 
{
category: "2nd Highest Playoff Score",
value: "192.88",
owner: "Chris",
year: "2025"
},
 
{
category: "3rd Highest Playoff Score",
value: "185.08",
owner: "Spencer",
year: "2023"
},
 
{
category: "Highest Historical Score",
value: "206.96",
owner: "Danny",
year: "2023"
}
 
];
 
return (
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
<h2
style={{
color:"#22c55e"
}}
>
📊 Record Book
</h2>
 
{records.map(record => (
 
<div
key={record.category}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
{record.category}
</strong>
 
<br />
 
{record.value}
 
<br />
 
{record.owner}
 
{" • "}
 
{record.year}
 
</div>
 
))}
 
</div>
 
);
 
}
