import type { NextPage } from 'next'
import { getOptionsForVote } from '../utils/getRandomChampion';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {

  const [first, second] = getOptionsForVote();

  return (    
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Champion is Stronger?</div>
      <div className="p-2"/>
      <div className="border-rounded p-8 m-2 flex justify-between max-w-2xl flex-g">
        <div className="mr-2 w-16 h-16 bg-red-800">{first}</div>
        <div>Vs.</div>
        <div className="ml-2 w-16 h-16 bg-red-800">{second}</div>
      </div>
    </div>
  );
}

export default Home
