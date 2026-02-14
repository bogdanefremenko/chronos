import { initTRPC } from "@trpc/server";
import z from "zod";
import { getCommits } from "./services/git";

const t = initTRPC.create({ isServer: true });

export const router = t.router({
    getGitHistory: t.procedure
        .input(z.object({ path: z.string(), }))
        .query(({ input }) => {
            return getCommits(input.path);
        }),
})

export type AppRouter = typeof router;