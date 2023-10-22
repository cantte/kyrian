import { z } from 'zod'

import {
  newMonographSchema,
  searchByTitleSchema,
  updateMonographSchema,
  uploadMonographSchema,
} from '../../schemas'
import { createDownloadPresignedUrl, createUploadPresignedUrl } from '../aws/s3'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const BUCKET_NAME =
  process.env.MONOGRAPH_STORAGE_S3_BUCKET ?? 'kyrian-monograph-repository'

export const monographRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(uploadMonographSchema)
    .mutation(async ({ input }) => {
      return await createUploadPresignedUrl({
        bucket: BUCKET_NAME,
        key: `${input.id}/${input.title}`,
      })
    }),
  create: protectedProcedure
    .input(newMonographSchema)
    .mutation(async ({ input, ctx }) => {
      const { authors, ...monograph } = input

      // remove monograph title whitespaces
      monograph.title = monograph.title.trim()

      // Before save check if the authors already exist in the database and if not, create them
      const monographExists = await ctx.prisma.monograph.findFirst({
        where: {
          title: {
            contains: monograph.title,
          },
          publicationDate: monograph.publicationDate,
        },
      })

      if (monographExists) {
        throw new Error('La monografía ya existe en la base de datos')
      }

      const authorsIds = authors
        .filter((author) => author.id !== undefined)
        .map((author) => author.id) as string[]

      const authorsInDb = await ctx.prisma.author.findMany({
        where: {
          id: {
            in: authorsIds,
          },
        },
      })

      const newAuthors = authors.filter(
        (author) =>
          !authorsInDb.some((authorInDb) => authorInDb.id === author.id),
      )

      const dataToCreate = {
        ...monograph,
        authors: {
          create: newAuthors.map((author) => ({
            ...author,
            // if id is undefined or empty string, set it to null to avoid creating a new author with an empty id field
            id: author.id !== undefined && author.id !== '' ? author.id : null,
          })),
          connect: authorsInDb.map((author) => ({
            uid: author.uid,
          })),
        },
      }

      return await ctx.prisma.monograph.create({
        data: dataToCreate,
      })
    }),
  find: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.monograph.findUnique({
        where: {
          id: input.id,
        },
        select: {
          title: true,
          id: true,
          publicationDate: true,
          degreeProgramId: true,
          degreeProgram: {
            select: {
              name: true,
            },
          },
          authors: {
            select: {
              name: true,
              id: true,
              uid: true,
            },
          },
        },
      })
    }),
  byTitle: publicProcedure
    .input(searchByTitleSchema)
    .query(async ({ input, ctx }) => {
      const monographs = await ctx.prisma.monograph.findMany({
        where: {
          title: {
            contains: input.title,
          },
          degreeProgramId: {
            in: input.degreePrograms,
          },
        },
        select: {
          title: true,
          id: true,
          publicationDate: true,
          degreeProgram: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          publicationDate: 'desc',
        },
        take: 30,
      })

      return await Promise.all(
        monographs.map(async (monograph) => {
          const downloadUrl = await createDownloadPresignedUrl({
            bucket: BUCKET_NAME,
            key: `${monograph.id}/${monograph.title}`,
          })
          return {
            ...monograph,
            downloadUrl,
          }
        }),
      )
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.monograph.findMany({
      select: {
        title: true,
        id: true,
        publicationDate: true,
        degreeProgram: {
          select: {
            name: true,
          },
        },
      },
    })
  }),
  downloadUrl: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const monograph = await ctx.prisma.monograph.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!monograph) {
        return null
      }

      return await createDownloadPresignedUrl({
        bucket: BUCKET_NAME,
        key: `${monograph.id}/${monograph.title}`,
      })
    }),
  edit: protectedProcedure
    .input(updateMonographSchema)
    .mutation(async ({ input, ctx }) => {
      const id = input.id
      const { authors, ...monograph } = input

      // remove monograph title whitespaces
      monograph.title = monograph.title.trim()

      // Check if the monograph exists in the database
      const monographExists = await ctx.prisma.monograph.findFirst({
        where: {
          id: id,
        },
      })

      if (!monographExists) {
        throw new Error('La monografía no existe en la base de datos')
      }

      // Before save check if the authors already exist in the database and if not, create them
      const authorsIds = authors
        .filter((author) => author.id !== undefined)
        .map((author) => author.id) as string[]

      const authorsInDb = await ctx.prisma.author.findMany({
        where: {
          id: {
            in: authorsIds,
          },
        },
      })

      const newAuthors = authors.filter(
        (author) =>
          !authorsInDb.some((authorInDb) => authorInDb.id === author.id),
      )

      const dataToUpdate = {
        ...monograph,
        authors: {
          create: newAuthors.map((author) => ({
            ...author,
          })),
          connect: authorsInDb.map((author) => ({
            uid: author.uid,
          })),
        },
      }

      return await ctx.prisma.monograph.update({
        where: {
          id: id,
        },
        data: dataToUpdate,
      })
    }),
})
