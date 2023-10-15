import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupItemsRouter = createTRPCRouter({

    // Get all groupItems
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.groupItems.findMany();
    }),
    
    // Get a groupItem by id
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.groupItems.findUnique({
            where: {
            id: input.id,
            },
        });
        }),
    
    // Create a new groupItem
    create: publicProcedure
        .input(z.object({ groupId: z.number(), itemId: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.groupItems.create({
            data: {
            groupId: input.groupId,
            itemId: input.itemId,
            },
        });
        }),
    
    // Delete a groupItem
    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input, ctx }) => {
        return ctx.db.groupItems.delete({
            where: {
            id: input.id,
            },
        });
        }),

})