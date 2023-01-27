import { useEffect, useState } from 'react';
import { ChampionsForVote, getChampionInfo } from '../server/getChampions';


export default function Home(){

  const [championsForVote, setChampionsForVote] = useState(() => getChampionInfo())
  const [champion] = championsForVote;

  console.log(champion)

  return (    
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Champion is Stronger?</div>
      <div className="p-2"/>
      <div className="border-rounded p-8 m-2 flex justify-between max-w-2xl flex-g">
        <div className="mr-2 w-16 h-16 bg-red-800">
         { champion?.first &&  <span>{champion?.first?.name}</span> }
        </div>
        <span>Vs.</span>
        <div className="ml-2 w-16 h-16 bg-red-800">
        { champion?.second &&  <span>{champion?.second?.name}</span> }
        </div>
      </div>
    </div>
  );
}
