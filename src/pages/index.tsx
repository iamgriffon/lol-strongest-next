import { ChampionListing } from "@/components/ChampionListing";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export type ChampionProps = {
  first: {
    index: Number
    icon: string
    name: string
    title: string
  } | undefined,
  second: {
    index: Number
    icon: string
    name: string
    title: string
  } | undefined
}

export default function Home() {

  const { data, isFetched } = trpc.getChampions.useQuery();
  const [champions, setChampions] = useState<ChampionProps>();
  const voteForStrongest = (selected?: Number) => {
    console.log(selected)
  }

  useEffect(() => {
    if (isFetched) setChampions(data)
  }, [isFetched])

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center ">Which Champion is Stronger?</div>
      <div className="p-2" />
      { isFetched ? (
        <div className="border-rounded border-zinc-600 border-2 p-8 flex flex-row justify-center max-w-2xl gap-6">
        <ChampionListing 
          data={champions?.first}
          vote={voteForStrongest}
        />
      <span>Vs.</span>
      <ChampionListing 
          data={champions?.second}
          vote={voteForStrongest}
        />
    </div>
      ) : <>Loading</>}
    </div>
  );
}
