import { z } from 'zod'

export const newResearchSeminarSchema = z.object({
  name: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  description: z.string().max(65535, 'Máximo 65535 caracteres').optional(),
  isActive: z.boolean().optional(),
  creation: z.date().optional(),
  expiration: z.date().optional(),
  students: z.array(z.string()).optional(),
})
