import { z } from "zod";
import { procedure, router } from "../trpc";
import { getRandomNumber } from "../utils/getRandomChampion";
import { prisma } from "../utils/prisma";

export const appRouter = router({
  voteForChampion: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
        include: {
          votedAgainst: true,
          votedFor: true,
        },
      });
      return {
        success: true,
        vote: voteInDb,
      };
    }),
    
  getChampions: procedure.query(async () => {
    let randomChampionIndex = getRandomNumber();
    while (randomChampionIndex.first === randomChampionIndex.second)
      randomChampionIndex = getRandomNumber();
    randomChampionIndex;

    const first = await prisma.champion.findFirst({
      where: {
        id: randomChampionIndex.first,
      },
    });

    const second = await prisma.champion.findFirst({
      where: {
        id: randomChampionIndex.second,
      },
    });

    if (!first || !second) throw Error("Lol doesn't exist");
    return {
      first,
      second,
    };
  }),

  cast_vote: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number().nonnegative(),
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
        include: {
          votedAgainst: true,
          votedFor: true,
        },
      });
      return {
        success: true,
        vote: voteInDb,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
