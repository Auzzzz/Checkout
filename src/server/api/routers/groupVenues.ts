import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupVenuesRouter = createTRPCRouter({
  // Get all venues for a group
  getAll: publicProcedure
    .input(z.object({ groupId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.groupVenues.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),

  // Add a venue to a group
  add: publicProcedure
    .input(z.object({ groupId: z.number(), venueId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.groupVenues.create({
        data: {
          groupId: input.groupId,
          venueId: input.venueId,
        },
      });
    }),

  // Remove a venue from a group
  remove: publicProcedure
    .input(
      z.object({ id: z.number(), groupId: z.number(), venueId: z.number() })
    )
    .query(({ input, ctx }) => {
      return ctx.db.groupVenues.delete({
        where: {
          id: input.id,
          groupId: input.groupId,
          venueId: input.venueId,
        },
      });
    }),
});
