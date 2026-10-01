export default function RecordsPage() {
const records = [
{
category: "🏆 Highest Score Ever",
record: "206.96",
holder: "Danny",
year: "2018",
},
{
category: "😬 Lowest Score Ever",
record: "48.22",
holder: "Jeff",
year: "2014",
},
{
category: "💥 Biggest Blowout",
record: "91.34",
holder: "Chris",
year: "2021",
},
{
category: "🤏 Closest Victory",
record: "0.12",
holder: "Nick",
year: "2019",
},
{
category: "👑 Most Championships",
record: "4",
holder: "Danny",
year: "All-Time",
},
{
category: "🎯 Most Playoff Appearances",
record: "15",
holder: "Danny",
year: "All-Time",
},
];
 
return (
<div className="space-y-6 p-6">
<h1 className="text-4xl font-bold">
🏆 CFFL Record Book
</h1>
 
<div className="grid gap-4 md:grid-cols-2">
{records.map((record) => (
<div
key={record.category}
className="rounded-xl border bg-zinc-900 p-5"
>
<h2 className="mb-3 text-xl font-bold">
{record.category}
</h2>
 
<div className="text-3xl font-bold text-green-400">
{record.record}
</div>
 
<div className="mt-2 text-zinc-300">
{record.holder}
</div>
 
<div className="text-sm text-zinc-500">
{record.year}
</div>
</div>
))}
</div>
</div>
);
}
