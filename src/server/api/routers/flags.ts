import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flagsRouter = createTRPCRouter({

    // view all flags
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.flags.findMany();
    }),

    // get a individual flag
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.flags.findUnique({
            where: {
            id: input.id,
            },
        });
        }),

})