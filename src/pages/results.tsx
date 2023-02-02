import { inferAsyncReturnType } from "@/server/utils/inferAsyncReturn";
import { prisma } from "@/server/utils/prisma";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

const getChampionsInOrder = async () => {
  return await prisma.champion.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      icon: true,
      title: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type ChampionQueryResult = inferAsyncReturnType<typeof getChampionsInOrder>;

const ResultListing: React.FC<{ champion: ChampionQueryResult[number] }> = (
  props
) => {
  const voteCountPercent = (champion: ChampionQueryResult[number]) => {
    const { VoteFor, VoteAgainst } = champion._count;
    const result = (VoteFor / (VoteFor + VoteAgainst)) * 100;
    if (VoteFor + VoteAgainst === 0) return "0.00";
    else return result.toFixed(2);
  };

  const championFullName = `${props.champion.name}, ${props.champion.title}`;
  return (
    <div className="flex border-b p-3 items-center justify-between">
      <div className="flex items-center">
        <Image
          src={props.champion.icon}
          width={64}
          height={64}
          alt={props.champion?.name}
        />
        <div className="capitalize pl-3">{championFullName}</div>
      </div>
      <div className="flex flex-col items-center justify-around">
        <div>Total Wins: {props.champion._count.VoteFor}</div>
        <div>Win Rate: {voteCountPercent(props.champion)}%</div>
      </div>
    </div>
  );
};

export const ResultsPage: React.FC<{
  results: ChampionQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full max-w-2xl items-center justify-evenly">
        <Link href="/">
          <h2 className="text-2xl p-2 hover:cursor-pointer">Go back </h2>
        </Link>
        <h2 className="text-2xl font-bold p-2 mx-auto">Results</h2>
      </div>
      <div className="p-2" />
      <div className="flex flex-col border w-full max-w-2xl">
        {props.results.map((champion, index) => {
          return <ResultListing key={index} champion={champion} />;
        })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getServerSideProps: GetStaticProps = async () => {
  const championOrdered = await getChampionsInOrder();
  return {
    props: {
      results: championOrdered,
      revalidate: 60 * 60 * 4,
    },
  };
};
