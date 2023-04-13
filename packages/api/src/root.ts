import { authRouter } from './router/auth'
import { studentRouter } from './router/student'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
})

export type AppRouter = typeof appRouter
