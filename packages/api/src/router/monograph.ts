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
      return await ctx.prisma.monograph.create({ data: input })
    }),
  byTitle: publicProcedure
    .input(searchByTitleSchema)
    .query(async ({ input, ctx }) => {
      const monographs = await ctx.prisma.monograph.findMany({
        where: {
          title: {
            contains: input.title,
          },
        },
        select: {
          title: true,
          id: true,
          publicationDate: true,
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
})
