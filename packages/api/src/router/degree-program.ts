import * as z from 'zod'

import {
  editDegreeProgramSchema,
  newDegreeProgramObjectiveSchema,
  newDegreeProgramProfileSchema,
  newDegreeProgramSchema,
} from '../schemas/degree-program'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

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
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.degreeProgram.findMany()
  }),
  info: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.degreeProgram.findMany({
      select: {
        code: true,
        name: true,
        modality: true,
        degree: true,
      },
    })
  }),
  read: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.degreeProgram.findFirst({
        include: {
          objectives: true,
          profiles: true,
        },
        where: {
          code: input.code,
        },
      })
    }),
  edit: protectedProcedure
    .input(editDegreeProgramSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.degreeProgram.update({
        data: input,
        where: {
          code: input.code,
        },
        include: {
          objectives: true,
          profiles: true,
        },
      })
    }),
  addProfile: protectedProcedure
    .input(newDegreeProgramProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const { degreeProgramCode, ...rest } = input
      return await ctx.prisma.degreeProgramProfiles.create({
        data: {
          ...rest,
          degreeProgram: {
            connect: {
              code: degreeProgramCode,
            },
          },
        },
      })
    }),
  addObjective: protectedProcedure
    .input(newDegreeProgramObjectiveSchema)
    .mutation(async ({ input, ctx }) => {
      const { degreeProgramCode, ...rest } = input
      return await ctx.prisma.degreeProgramObjectives.create({
        data: {
          ...rest,
          degreeProgram: {
            connect: {
              code: degreeProgramCode,
            },
          },
        },
      })
    }),
  removeProfile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.degreeProgramProfiles.delete({
        where: {
          id: input.id,
        },
      })
    }),
  removeObjective: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.degreeProgramObjectives.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
