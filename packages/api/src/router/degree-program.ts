import { newDegreeProgramSchema } from '../schemas/degree-program'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const degreeProgramRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newDegreeProgramSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.degreeProgram.create({ data: input })
    }),
  getNameAndCode: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.degreeProgram.findMany({
      select: {
        code: true,
        name: true,
      },
    })
  }),
})
