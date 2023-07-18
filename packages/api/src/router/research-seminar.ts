import { newResearchSeminarSchema } from '../schemas/research-seminar'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const researchSeminarRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newResearchSeminarSchema)
    .mutation(async ({ input, ctx }) => {
      const { students, ...researchSeminar } = input

      // remove researchSeminar title whitespaces
      researchSeminar.name = researchSeminar.name.trim()

      // Before save check if the students already exist in the database and if not, create them
      const researchSeminarExists = await ctx.prisma.researchSeminar.findFirst({
        where: {
          name: {
            contains: researchSeminar.name,
          },
          creation: researchSeminar.creation,
        },
      })

      if (researchSeminarExists) {
        throw new Error(
          'El seminario de investigación ya existe en la base de datos',
        )
      }

      return await ctx.prisma.researchSeminar.create({
        data: {
          ...researchSeminar,
          students: {
            connect: students?.map((student) => ({ id: student })),
          },
        },
      })
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.researchSeminar.findMany()
  }),
})
