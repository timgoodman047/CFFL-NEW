export interface SeasonHistory {
 
year: number;
 
champion: string;
 
championOwner: string;
 
runnerUp?: string;
 
runnerUpOwner?: string;
 
highestScore?: {
 
owner: string;
 
score: number;
 
};
 
notes?: string;
 
}
 
export const history: SeasonHistory[] = [
 
{
year: 2025,
champion: "Short Board Champ",
championOwner: "Chris",
 
highestScore: {
owner: "Tim",
score: 195.94
},
 
notes:
"Chris won the championship."
},
 
{
year: 2024,
champion: "Link?",
championOwner: "Jeff",
 
highestScore: {
owner: "Danny",
score: 160.56
}
},
 
{
year: 2023,
champion: "1-0 mentality",
championOwner: "Spencer",
 
highestScore: {
owner: "Danny",
score: 206.96
}
},
 
{
year: 2022,
champion: "Orangeman",
championOwner: "Nick",
 
highestScore: {
owner: "Nick",
score: 174.94
}
},
 
{
year: 2021,
champion: "The Mahomies",
championOwner: "The Other",
 
highestScore: {
owner: "Tim",
score: 209.2
}
},
 
{
year: 2020,
champion: "Office Quotes",
championOwner: "Danny",
 
highestScore: {
owner: "Danny",
score: 205.64
}
},
 
{
year: 2019,
champion: "Chiefs 2020 Champs",
championOwner: "Tim",
 
highestScore: {
owner: "Danny",
score: 182.52
}
},
 
{
year: 2018,
champion: "Moose Knuckles",
championOwner: "The Other"
}
 
];
