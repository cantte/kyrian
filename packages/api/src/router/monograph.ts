import { newMonographSchema, uploadMonographSchema } from '../../schemas'
import { createPresignedUrl } from '../aws/s3'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const BUCKET_NAME =
  process.env.MONOGRAPH_STORAGE_S3_BUCKET ?? 'kyrian-monograph-repository'

export const monographRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(uploadMonographSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id

      return await createPresignedUrl({
        bucket: BUCKET_NAME,
        key: `${userId}/${input.title}`,
      })
    }),
  create: protectedProcedure
    .input(newMonographSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.monograph.create({ data: input })
    }),
})
