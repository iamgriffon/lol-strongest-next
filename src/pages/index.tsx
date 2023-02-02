import { ChampionListing } from "@/components/ChampionListing";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export type ChampionProps = {
  first:
    | {
        id: number;
        icon: string;
        name: string;
        title: string;
      }
    | undefined;
  second:
    | {
        id: number;
        icon: string;
        name: string;
        title: string;
      }
    | undefined;
};


export default function Home() {
  const { data, isFetched, refetch } = trpc.getChampions.useQuery();
  const { mutateAsync } = trpc.voteForChampion.useMutation();

  const [champions, setChampions] = useState<ChampionProps>();

  const [fetched, setFetched] = useState(isFetched);
  const voteForStrongest = async (voted: number) => {
    const votes = {
      votedFor: voted,
      votedAgainst:
        voted === champions!.first!.id
          ? champions!.second!.id
          : champions!.first!.id,
    };

    mutateAsync(votes);

    const { data, isFetched } = await refetch();

    if (data?.first && data.second) {
      setChampions(data);
      setFetched(isFetched);
    }
  };

  useEffect(() => {
    setFetched(isFetched);
  }, [isFetched]);

  useEffect(() => {
    setChampions(data);
  }, [data]);

  return (
    <>
      <div className="h-[90vh] w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center ">Which Champion is Stronger?</div>
        <div className="p-2" />
        {fetched ? (
          <div className="border-rounded border-zinc-600 border-2 p-8 flex flex-row justify-center max-w-2xl gap-6">
            <ChampionListing data={champions?.first} vote={voteForStrongest} />
            <span className="absolute">Vs.</span>
            <ChampionListing data={champions?.second} vote={voteForStrongest} />
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
      <div className="relative bottom-6 items-center justify-center flex text-xl text-center pb-2 gap-3">
        <a className="hover:text-stone-300" href="https://github.com/iamgriffon/lol-strongest-next">GitHub</a>
        {'|'}
        <Link href="/results">
          <p className="hover:text-stone-300">Results</p>
        </Link>
      </div>
    </>
  );
}
