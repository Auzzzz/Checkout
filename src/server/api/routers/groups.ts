import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupsRouter = createTRPCRouter({
  // Get all groups
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.groups.findMany();
  }),

  // Get a group by id
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.groups.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Create a new group
  create: publicProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.groups.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Update a group
  update: publicProcedure
    .input(
      z.object({ id: z.number(), name: z.string(), description: z.string() })
    )
    .query(({ input, ctx }) => {
      return ctx.db.groups.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Delete a group
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.groups.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
