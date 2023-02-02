import { inferAsyncReturnType } from "@/server/utils/inferAsyncReturn";
import { prisma } from "@/server/utils/prisma";
import { GetStaticProps } from "next";
import Image from "next/image";

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
    if (VoteFor + VoteAgainst === 0) return 0;
    else return result;
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
        <div className="capitalize">{championFullName}</div></div>
        <div>{voteCountPercent(props.champion)}%</div>
    </div>
  );
};

export const ResultsPage: React.FC<{
  results: ChampionQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl p-5">Results</h2>
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
