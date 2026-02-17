import { initTRPC } from '@trpc/server';
import z from 'zod';
import { getCommits, getCommitsCount } from './services/git';

const t = initTRPC.create({ isServer: true });

export const router = t.router({
  getGitCommits: t.procedure
    .input(
      z.object({ path: z.string(), skip: z.number().optional(), maxCount: z.number().optional() }),
    )
    .query(({ input }) => {
      return getCommits(input.path, input.skip, input.maxCount);
    }),
  getGitCommitsCount: t.procedure.input(z.object({ path: z.string() })).query(({ input }) => {
    return getCommitsCount(input.path);
  }),
});

export type AppRouter = typeof router;
