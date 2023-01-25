import { z } from 'zod';

import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string().nullable(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
  voteForChampion: procedure
  .input(
    z.object({
      voteInFavor: z.string(),
      voteAgainst: z.string()
    }))
  .query(({input}) => {
    return input
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;