import { z } from 'zod'

import { newStudentSchema } from '../../schemas'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const studentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newStudentSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.student.create({ data: input })
    }),
  byUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.student.findFirst({
      where: { userId: ctx.session.user.id },
    })
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.student.findFirst({ where: { id: input.id } })
    }),
})
