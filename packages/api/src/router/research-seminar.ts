import { newResearchSeminarSchema } from '../schemas/research-seminar'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const researchSeminarRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newResearchSeminarSchema)
    .mutation(async ({ input, ctx }) => {
      const { students, ...researchSeminar } = input

      // remove researchSeminar title whitespaces
      researchSeminar.name = researchSeminar.name.trim()

      // Check if the researchSeminar exists in the database
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

      if (students === undefined) {
        throw new Error('Debe ingresar al menos un estudiante')
      }

      // Before save check if the students already exist in the database and if not, create them
      const studentsIds = students
        .filter((student) => student.id !== undefined)
        .map((student) => student.id)

      const studentsInDb = await ctx.prisma.student.findMany({
        where: {
          id: {
            in: studentsIds,
          },
        },
      })

      const newStudents = students.filter(
        (student) =>
          !studentsInDb.some((studentInDb) => studentInDb.id === student.id),
      )

      return await ctx.prisma.researchSeminar.create({
        data: {
          ...researchSeminar,
          students: {
            create: newStudents,
            connect: studentsInDb.map((student) => ({
              id: student.id,
            })),
          },
        },
      })
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.researchSeminar.findMany()
  }),
  info: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.researchSeminar.findMany({
      select: {
        name: true,
        description: true,
        creation: true,
      },
    })
  }),
})
