import champions from "./champions.json";

export type Champion = typeof champions;

const TOTAL_CHAMPIONS = champions.length;

function getRandomNumbers(){
    
  let firstIndex = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1;
  let secondIndex = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1;
  while (firstIndex != secondIndex)
     return [
    firstIndex = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1, 
    secondIndex = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1
    ]
  return [firstIndex, secondIndex]
}

const indexedChampionList = champions.map((champion, index) => {
  const { name, icon, title } = champion;
  return {
    index: index,
    name,
    icon,
    title
  }
})

const [first, second] = getRandomNumbers();

export function getChampionInfo(){
  return [
    {
      first: indexedChampionList[first!],
      second: indexedChampionList[second!]
    }
  ]
}

export type ChampionsForVote = typeof getChampionInfo;

