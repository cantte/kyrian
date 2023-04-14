import { newStudentSchema } from '../../schemas'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const studentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newStudentSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.student.create({ data: input })
    }),
})
