import { z } from 'zod'

export const newEventSchema = z.object({
  title: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  description: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(512, 'Máximo 512 caracteres')
    .nullable(),
  date: z.coerce.date().refine((date) => date >= new Date(), {
    message: 'La fecha del evento debe ser mayor o igual a la fecha actual',
  }),
  place: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  userId: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(128, 'Máximo 128 caracteres'),
})
