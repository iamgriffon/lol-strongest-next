import champions from "../champions.json";

const TOTAL_CHAMPIONS = champions.length

export function getRandomNumber(){
  const first = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1;
  const second = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1;
  return { first, second }
}