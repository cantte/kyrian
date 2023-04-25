import { authRouter } from './router/auth'
import { degreeProgramRouter } from './router/degree-program'
import { monographRouter } from './router/monograph'
import { studentRouter } from './router/student'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
  monograph: monographRouter,
  degreeProgram: degreeProgramRouter,
})

export type AppRouter = typeof appRouter
