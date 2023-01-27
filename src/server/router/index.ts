import { z } from 'zod';
import champions from "../champions.json";
import { procedure, router } from '../trpc';
import { getRandomNumber } from '../utils/getRandomChampion';
import { prisma } from '../utils/prisma';

export const appRouter = router({
  voteForChampion: procedure
    .input(
      z.object({
        voteInFavor: z.string(),
        voteAgainst: z.string()
      }))
    .query(({ input }) => {
      return input
    }),
  getChampions: procedure
    .query(() => {
      let randomChampionIndex = getRandomNumber();
      while (randomChampionIndex.first === randomChampionIndex.second) randomChampionIndex = getRandomNumber()
      randomChampionIndex;

      const indexedChampionList = champions.map((champion, index) => {
        const { name, icon, title } = champion;
        return {
          index: index,
          name,
          icon,
          title
        }
      })

      const first = indexedChampionList.find(champion => champion?.index === randomChampionIndex.first);
      const second = indexedChampionList.find(champion => champion?.index === randomChampionIndex.second);
      return {
        first,
        second
      }
    }),

  cast_vote: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number()
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          ...input,
        },
    });
      return {
        success: true,
        vote: voteInDb
      }
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;