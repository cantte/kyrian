import { z } from 'zod'

export const newDegreeProgramSchema = z.object({
  code: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
  name: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  degree: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),

  state: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  city: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),

  credits: z.coerce.number().min(1, 'Debe digitar este campo'),
  duration: z.coerce.number().min(1, 'Debe digitar este campo'),
  modality: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),

  isActive: z.boolean(),

  phone: z.string().max(10, 'Máximo 10 caracteres').optional(),
  email: z
    .string()
    .email()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres'),

  creationStandard: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  creationStandardDate: z.coerce.date(),
  cost: z.coerce.number().min(1, 'Debe digitar este campo'),
  studentQuota: z.coerce.number().min(1, 'Debe digitar este campo'),
  knowledgeArea: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  address: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
})
