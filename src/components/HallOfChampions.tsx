import Link from "next/link";

export default function HallOfChampions() {
const champions = [
{ year: 2025, champion: "Chris" },
{ year: 2024, champion: "Jeff" },
{ year: 2023, champion: "Nick" },
{ year: 2022, champion: "Nick" },
{ year: 2021, champion: "The Other (Drew)" },
{ year: 2020, champion: "Danny" },
{ year: 2019, champion: "Tim" },
{ year: 2018, champion: "The Other (Drew)" },
{ year: 2017, champion: "Tim" },
{ year: 2016, champion: "Brian" },
{ year: 2015, champion: "Jason" },
{ year: 2014, champion: "D3" },
{ year: 2013, champion: "Danny" },
{ year: 2012, champion: "Tim" },
{ year: 2011, champion: "D3" },
{ year: 2010, champion: "Brian" },
{ year: 2009, champion: "Chris" },
{ year: 2008, champion: "Danny" },
{ year: 2006, champion: "Danny" },
];
 
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
🏆 Hall Of Champions
</h2>
 
{champions.map((season) => (
<Link
key={season.year}
href={`/season/${season.year}`}
style={{
textDecoration: "none",
color: "inherit",
}}
>
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
cursor: "pointer",
transition: "0.2s",
}}
>
<strong>
🏆 {season.year}
</strong>

<br />

Champion: {season.champion}

<br />

<span
style={{
color: "#22c55e",
fontSize: "14px",
}}
>
View Season →
</span>
</div>
</Link>
))}
</div>
);
}
