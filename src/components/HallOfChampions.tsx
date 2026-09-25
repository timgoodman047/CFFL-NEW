const champions = [
{
year: 2025,
champion: "Short Board Champ",
owner: "Chris",
finish: "1st"
},
{
year: 2024,
champion: "Link?",
owner: "Jeff",
finish: "1st"
},
{
year: 2023,
champion: "1-0 mentality",
owner: "Spencer",
finish: "2nd"
},
{
year: 2022,
champion: "Orangeman",
owner: "Nick",
finish: "1st"
},
{
year: 2021,
champion: "The Mahomies",
owner: "Drew",
finish: "1st"
},
{
year: 2020,
champion: "Office Quotes",
owner: "Danny",
finish: "1st"
},
{
year: 2019,
champion: "Chiefs 2020 Champs",
owner: "Tim",
finish: "1st"
},
{
year: 2018,
champion: "Moose Knuckles",
owner: "Drew",
finish: "1st"
},
{
year: 2017,
champion: "God Hates Jags",
owner: "Brian",
finish: "1st"
},
{
year: 2016,
champion: "Las Vegas Raiders",
owner: "Brian",
finish: "1st"
}
];
 
export default function HallOfChampions() {
 
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
🏆 Hall Of Champions
</h2>
 
{champions.map(champion => (
 
<div
key={champion.year}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
{champion.year}
</strong>
 
<br />
 
Champion:
{" "}
{champion.champion}
 
<br />
 
Owner:
{" "}
{champion.owner}
 
</div>
 
))}
 
</div>
 
);
 
}
