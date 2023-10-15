import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  // Get a user by id
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.users.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Get a user by name
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.users.findUnique({
        where: {
          name: input.name,
        },
      });
    }),

  // Create a new user
  create: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .query(({ input, ctx }) => {
      return ctx.db.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),

  // Update a user
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.db.users.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),

  // Delete a user
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.users.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
