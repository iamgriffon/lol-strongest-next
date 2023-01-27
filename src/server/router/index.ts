import { z } from 'zod';
import { getChampionInfo } from '../getChampions';


import { procedure, router } from '../trpc';

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
    // .output(
    //   z.object({
    //     first: z.object({
    //       index: z.number(),
    //       name: z.string(),
    //       title: z.string(),
    //       icon: z.string()
    //     }),
    //     second: z.object({
    //       index: z.number(),
    //       name: z.string(),
    //       title: z.string(),
    //       icon: z.string()
    //     })
    //   })
    // )
    .query(() => {
      return { msg: 'hello world' }
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;