import { newEventSchema } from '../schemas/event'
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
})
