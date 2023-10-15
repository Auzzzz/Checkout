import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupMembersRouter = createTRPCRouter({

    // Get all groupMembers of a group
    getAll: publicProcedure
        .input(z.object({ groupId: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.groupMembers.findMany({
                where: {
                    groupId: input.groupId
                }
            });
        }),
    
    // Add a user to a group
    add: publicProcedure
        .input(z.object({ groupId: z.number(), userId: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.groupMembers.create({
                data: {
                    groupId: input.groupId,
                    userId: input.userId
                }
            });
        }),

    // Remove a user from a group
    remove: publicProcedure
        .input(z.object({ id: z.number(), groupId: z.number(), userId: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.groupMembers.delete({
                where: {
                    id: input.id,
                    groupId: input.groupId,
                    userId: input.userId
                }
            });
        }),

    // Remove all users from a group
    removeAll: publicProcedure
        .input(z.object({ groupId: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.groupMembers.deleteMany({
                where: {
                    groupId: input.groupId
                }
            });
        }),

})