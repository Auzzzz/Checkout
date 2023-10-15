import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const venuesRouter = createTRPCRouter({
  // Get a venue by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.venues.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Get all venues
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.venues.findMany();
  }),

  // Create a new venue
  create: publicProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.venues.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Update a venue
  update: publicProcedure
    .input(
      z.object({ id: z.number(), name: z.string(), description: z.string() })
    )
    .query(({ input, ctx }) => {
      return ctx.db.venues.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Delete a venue
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.venues.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
