import { newEventSchema, updateEventSchema } from '../schemas/event'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.create({ data: input })
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
    })
  }),
  listAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.event.findMany()
  }),
  update: protectedProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: input,
      })
    }),
})
