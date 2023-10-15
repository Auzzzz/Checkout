import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemsRouter = createTRPCRouter({

    // Get all items
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.items.findMany();
    }),

    // Get an item by ID
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.items.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    // Create a new item
    create: publicProcedure
        .input(z.object({ name: z.string(), description: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.db.items.create({
                data: {
                    name: input.name,
                    description: input.description,
                },
            });
        }),

    // Update an item
    update: publicProcedure
        .input(
            z.object({ id: z.number(), name: z.string(), description: z.string() })
        )
        .query(({ input, ctx }) => {
            return ctx.db.items.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                    description: input.description,
                },
            });
        }),

    // Delete an item
    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input, ctx }) => {
            return ctx.db.items.delete({
                where: {
                    id: input.id,
                },
            });
        }),

    

})