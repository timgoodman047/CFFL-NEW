import { history } from "./history";

const franchises = [
  {
    slug: "tim",
    owner: "Tim",
    name: "Tim",
    championships: [2012, 2017, 2019],
    runnerUps: [],
    playoffTrips: 10,
    winningPct: 0.575,
    highestScore: 209.2,
    highestPlayoffScore: 194.68,
    moneyWon: "$3300",
    overallRecord: "120-88",
    sleeperTeam: "Tim",
    yearsActive: 20,
bestFinish: 1,
notes: "",
    bio: "One of the most successful owners in league history.",
  },

  {
    slug: "danny",
    owner: "Danny",
    name: "Danny",
    championships: [2006, 2008, 2013, 2020],
    runnerUps: [],
    playoffTrips: 11,
    winningPct: 0.590,
    highestScore: 206.96,
    highestPlayoffScore: 180,
    moneyWon: "$4400",
    overallRecord: "130-90",
    sleeperTeam: "Danny",
    yearsActive: 20,
bestFinish: 1,
notes: "",
    bio: "Founding-era powerhouse and multi-time champion.",
  },

  {
    slug: "nick",
    owner: "Nick",
    name: "Nick",
    championships: [2022, 2023],
    runnerUps: [],
    playoffTrips: 5,
    winningPct: 0.620,
    highestScore: 206.96,
    highestPlayoffScore: 175,
    moneyWon: "$2200",
    overallRecord: "62-38",
    sleeperTeam: "Orangeman",
    yearsActive: 20,
bestFinish: 1,
notes: "",
    bio: "Back-to-back champion and modern dynasty threat.",
  },

  {
    slug: "chris",
    owner: "Chris",
    name: "Chris",
    championships: [2009, 2025],
    runnerUps: [],
    playoffTrips: 8,
    winningPct: 0.540,
    highestScore: 195.94,
    highestPlayoffScore: 192.88,
    moneyWon: "$2200",
    overallRecord: "95-81",
    sleeperTeam: "Short Board Champ",
    yearsActive: 20,
bestFinish: 1,
notes: "",
    bio: "Latest champion and perennial contender.",
  },
];

export const franchises = franchiseData.map((franchise) => ({
  ...franchise,
  championships: history
    .filter(
      (season) =>
        season.champion.toLowerCase() ===
        franchise.owner.toLowerCase()
    )
    .map((season) => season.year),
}));
