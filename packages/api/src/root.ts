import { authRouter } from './router/auth'
import { degreeProgramRouter } from './router/degree-program'
import { documentRouter } from './router/document'
import { eventRouter } from './router/event'
import { monographRouter } from './router/monograph'
import { studentRouter } from './router/student'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
  monograph: monographRouter,
  degreeProgram: degreeProgramRouter,
  event: eventRouter,
  document: documentRouter,
})

export type AppRouter = typeof appRouter
