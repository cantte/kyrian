import { z } from 'zod'

export const uploadDocumentSchema = z.object({
  id: z.string().min(1, 'Debe digitar este campo').max(191),
  title: z.string().min(1, 'Debe digitar este campo').max(256),
})

export const newDocumentSchema = z.object({
  name: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres'),
  type: z.enum([
    'StrategicPlan',
    'Protocol',
    'Format',
    'Agreement',
    'Standard',
  ]),
  userId: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(128, 'Máximo 128 caracteres'),
})

export const searchByTypeDocumentSchema = z.object({
  type: z.enum([
    'StrategicPlan',
    'Protocol',
    'Format',
    'Agreement',
    'Standard',
  ]),
})
