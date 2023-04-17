import { uploadMonographSchema } from '../../schemas'
import { S3 } from '../aws'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const BUCKET_NAME =
  process.env.MONOGRAPH_STORAGE_S3_BUCKET ?? 'kyrian-monograph-repository'
const UPLOADING_TIME_LIMIT = 30
const UPLOAD_MAX_FILE_SIZE = 1000000

export const monographRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(uploadMonographSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id

      return await new Promise((resolve, reject) => {
        S3.createPresignedPost(
          {
            Fields: {
              key: `${userId}/${input.title}`,
            },
            Conditions: [
              ['starts-with', '$Content-Type', 'image/'],
              ['content-length-range', 0, UPLOAD_MAX_FILE_SIZE],
            ],
            Expires: UPLOADING_TIME_LIMIT,
            Bucket: BUCKET_NAME,
          },
          (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          },
        )
      })
    }),
})
