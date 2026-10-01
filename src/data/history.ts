const historicalChampions = [
{
year: 2022,
champion: "Nick",
team: "Orangeman",
},
{
year: 2021,
champion: "The Other (Drew)",
team: "The Other",
},
{
year: 2020,
champion: "Danny",
team: "Danny",
},
{
year: 2019,
champion: "Tim",
team: "Tim",
},
{
year: 2018,
champion: "The Other (Drew)",
team: "The Other",
},
{
year: 2017,
champion: "Tim",
team: "Tim",
},
{
year: 2016,
champion: "Brian",
team: "Brian",
},
{
year: 2015,
champion: "Jason",
team: "Jason",
},
{
year: 2014,
champion: "D3",
team: "D3",
},
{
year: 2013,
champion: "Danny",
team: "Danny",
},
{
year: 2012,
champion: "Tim",
team: "Tim",
},
{
year: 2011,
champion: "D3",
team: "D3",
},
{
year: 2010,
champion: "Brian",
team: "Brian",
},
{
year: 2009,
champion: "Chris",
team: "Chris",
},
{
year: 2008,
champion: "Danny",
team: "Danny",
},
{
year: 2007,
champion: "TBD",
team: "TBD",
},
{
year: 2006,
champion: "Danny",
team: "Danny",
},
].map((season) => ({
...season,
runnerUp: "TBD",
highestScore: 0,
championshipScore: "TBD",
mvp: season.champion,
storyline: `${season.champion} won the CFFL Championship.`,
pointsLeader: "TBD",
sacko: "TBD",
semifinals: [],
thirdPlaceGame: "TBD",
championship: "TBD",
awards: [],
standings: [],
records: [],
notes: "Historical season data pending.",
}));

export const history = [
  ...historicalChampions,
{
year: 2025,
champion: "Chris",
team: "Short Board Champ",
runnerUp: "Spencer",
highestScore: 195.94,
championshipScore: "164.2 - 141.5",
mvp: "Chris",
storyline: "Chris captured the championship.",
pointsLeader: "Chris",
sacko: "Matt",
 
semifinals: [
"Chris def. Nick",
"Spencer def. Brian"
],
 
thirdPlaceGame:
"Nick def. Brian",
 
championship:
"Chris def. Spencer 164.2 - 141.5",
 
awards: [
"MVP: Chris",
"Best Draft: Nick",
"Waiver Wizard: Spencer"
],
 
standings: [
"1. Spencer",
"2. Chris",
"3. Nick",
"4. Brian",
"5. Jason",
"6. Tim",
"7. Tom",
"8. Danny",
"9. Jeff",
"10. Matt"
],
 
records: [
"Highest Weekly Score: 195.94",
"Most Points For: Chris",
"Best Record: Spencer"
],
 
notes:
"Chris won the championship after defeating Spencer."
},
 
{
year: 2024,
champion: "Jeff",
team: "Link?",
runnerUp: "Chris",
highestScore: 191.22,
championshipScore: "152.8 - 138.9",
mvp: "Jeff",
storyline: "Jeff won his first title.",
pointsLeader: "Spencer",
sacko: "Tom",
 
semifinals: [
"Jeff def. Danny",
"Chris def. Jason"
],
 
thirdPlaceGame:
"Danny def. Jason",
 
championship:
"Jeff def. Chris 152.8 - 138.9",
 
awards: [
"MVP: Jeff",
"Best Draft: Spencer",
"Waiver Wizard: Chris"
],
 
standings: [
"1. Spencer",
"2. Chris",
"3. Jason",
"4. Danny",
"5. Tim",
"6. Nick",
"7. Brian",
"8. Matt",
"9. Jeff",
"10. Tom"
],
 
records: [
"Highest Weekly Score: 191.22",
"Most Points For: Spencer",
"Best Record: Spencer"
],
 
notes:
"Jeff earned his first league championship."
},
 
{
year: 2023,
champion: "Nick",
team: "Orangeman",
runnerUp: "Spencer",
highestScore: 206.96,
championshipScore: "171.4 - 145.8",
mvp: "Nick",
storyline:
"Nick completed back-to-back championships.",
pointsLeader: "Nick",
sacko: "Matt",
 
semifinals: [
"Nick def. Danny",
"Spencer def. Jason"
],
 
thirdPlaceGame:
"Danny def. Jason",
 
championship:
"Nick def. Spencer 171.4 - 145.8",
 
awards: [
"MVP: Nick",
"Best Draft: Nick",
"Waiver Wizard: Jason"
],
 
standings: [
"1. Nick",
"2. Spencer",
"3. Danny",
"4. Jason",
"5. Tim",
"6. Tom",
"7. Chris",
"8. Brian",
"9. Jeff",
"10. Matt"
],
 
records: [
"Highest Weekly Score: 206.96",
"Most Points For: Nick",
"Best Record: Nick"
],
 
notes:
"Nick secured consecutive championships."
}

export const history = [
{
year: 2025,
...
},
 
{
year: 2024,
...
},
 
{
year: 2023,
...
},
 
...historicalChampions,
].sort((a, b) => b.year - a.year);
];
