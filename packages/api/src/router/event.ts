import { createUploadPresignedUrl } from '../aws/s3'
import {
  newEventSchema,
  updateEventSchema,
  uploadEventSchema,
} from '../schemas/event'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const BUCKET_NAME = process.env.EVENT_STORAGE_S3_BUCKET ?? 'kyrian-event-images'

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.create({ data: input })
    }),
  upload: protectedProcedure
    .input(uploadEventSchema)
    .mutation(async ({ input }) => {
      return await createUploadPresignedUrl({
        bucket: BUCKET_NAME,
        key: `${input.id}/${input.title}`,
      })
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
    })

    return await Promise.all(
      events.map(async (event) => {
        const url = await createUploadPresignedUrl({
          bucket: BUCKET_NAME,
          key: `${event.id}/${event.title}`,
        })
        return {
          ...event,
          url,
        }
      }),
    )
  }),
  listAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.event.findMany()
  }),
  update: protectedProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: input,
      })
    }),
})
