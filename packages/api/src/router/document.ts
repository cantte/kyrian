import { createUploadPresignedUrl } from '../aws/s3'
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
      return await ctx.prisma.document.findMany({
        where: {
          type: input.type,
        },
      })
    }),
})
