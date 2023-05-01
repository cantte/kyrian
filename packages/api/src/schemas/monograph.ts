import { z } from 'zod'

export const uploadMonographSchema = z.object({
  id: z.string().min(1, 'Debe digitar este campo').max(191),
  title: z.string().min(1, 'Debe digitar este campo').max(256),
})

export const newMonographSchema = z.object({
  title: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres'),
  publicationDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: 'La fecha de publicación debe ser menor o igual a la fecha actual',
  }),
  authorId: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
  degreeProgramId: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
})

export const searchByTitleSchema = z
  .object({
    title: z.string().min(1, 'Debe digitar este campo').max(256),
  })
  .refine((data) => data.title.trim().length > 0, {
    message: 'Debe digitar este campo',
    path: ['title'],
  })
