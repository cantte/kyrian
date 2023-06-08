import { createDownloadPresignedUrl, createUploadPresignedUrl } from '../aws/s3'
import {
  newDocumentSchema,
  searchByTypeDocumentSchema,
  uploadDocumentSchema,
} from '../schemas/document'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const BUCKET_NAME =
  process.env.DOCUMENT_STORAGE_S3_BUCKET ?? 'kyrian-document-repository'

export const documentRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(uploadDocumentSchema)
    .mutation(async ({ input }) => {
      return await createUploadPresignedUrl({
        bucket: BUCKET_NAME,
        key: `${input.id}/${input.name}`,
      })
    }),
  create: protectedProcedure
    .input(newDocumentSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.document.create({
        data: input,
      })
    }),
  byType: publicProcedure
    .input(searchByTypeDocumentSchema)
    .query(async ({ input, ctx }) => {
      const session = ctx.session
      if (!session && input.type === 'Standard') {
        // Standard is only available for authenticated users
        return []
      }

      const documents = await ctx.prisma.document.findMany({
        where: {
          type: input.type,
        },
      })

      return await Promise.all(
        documents.map(async (document) => {
          const url = await createDownloadPresignedUrl({
            bucket: BUCKET_NAME,
            key: `${document.id}/${document.name}`,
          })
          return {
            ...document,
            url,
          }
        }),
      )
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const documents = await ctx.prisma.document.findMany()
    return await Promise.all(
      documents.map(async (document) => {
        const url = await createDownloadPresignedUrl({
          bucket: BUCKET_NAME,
          key: `${document.id}/${document.name}`,
        })
        return {
          ...document,
          url,
        }
      }),
    )
  }),
})
