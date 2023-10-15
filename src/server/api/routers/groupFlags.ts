import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupFlagsRouter = createTRPCRouter({

    // Get flags for each group
    getGroup: publicProcedure
        .input(z.object({ groupId: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.group_Flags.findMany({
            where: {
            groupId: input.groupId,
            },
        });
        }),

    // Get all groups for each flag
    getFlag: publicProcedure
        .input(z.object({ flagId: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.group_Flags.findMany({
            where: {
            flagId: input.flagId,
            },
        });
        }),

    // Add a flag to a group
    add: publicProcedure
        .input(z.object({ groupId: z.number(), flagId: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.group_Flags.create({
            data: {
            groupId: input.groupId,
            flagId: input.flagId,
            },
        });
        }),
    
    // Remove a flag from a group
    remove: publicProcedure
        .input(z.object({ id: z.number(), groupId: z.number(), flagId: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.group_Flags.delete({
            where: {
            id: input.id,
            groupId: input.groupId,
            flagId: input.flagId,
            },
        });
        }),

    

})