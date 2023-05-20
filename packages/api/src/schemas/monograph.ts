import { z } from 'zod'

export const uploadMonographSchema = z.object({
  id: z.string().min(1, 'Debe digitar este campo').max(191),
  title: z.string().min(1, 'Debe digitar este campo').max(256),
})

export const newAuthorSchema = z.object({
  id: z.string().max(10, 'Máximo 10 caracteres').optional(),
  name: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres'),
})

export const newMonographSchema = z.object({
  title: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres'),
  publicationDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: 'La fecha de publicación debe ser menor o igual a la fecha actual',
  }),
  authorId: z.string().max(10, 'Máximo 10 caracteres').optional(),
  degreeProgramId: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
  authors: z.array(newAuthorSchema),
})

export const searchByTitleSchema = z
  .object({
    title: z.string().min(1, 'Debe digitar este campo').max(256),
    degreePrograms: z.array(z.string().min(1)).optional(),
  })
  .refine((data) => data.title.trim().length > 0, {
    message: 'Debe digitar este campo',
    path: ['title'],
  })
