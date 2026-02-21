import { initTRPC } from '@trpc/server';
import z from 'zod';
import { getCommits, getCommitsCount } from './services/git';

const t = initTRPC.create({ isServer: true });

export const router = t.router({
  getGitCommits: t.procedure
    .input(
      z.object({
        repositoryPath: z.string(),
        skip: z.number().optional(),
        take: z.number().optional(),
      }),
    )
    .query(({ input }) => {
      return getCommits(input.repositoryPath, input.skip, input.take);
    }),
  getGitCommitsCount: t.procedure
    .input(z.object({ repositoryPath: z.string() }))
    .query(({ input }) => {
      return getCommitsCount(input.repositoryPath);
    }),
});

export type AppRouter = typeof router;
