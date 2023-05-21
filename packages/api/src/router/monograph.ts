import {
  newMonographSchema,
  searchByTitleSchema,
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
})
