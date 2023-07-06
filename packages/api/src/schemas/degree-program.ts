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
})

export const editDegreeProgramSchema = newDegreeProgramSchema.extend({
  history: z
    .string({
      required_error: 'La historia es requerida',
    })
    .nonempty()
    .optional(),
  mission: z
    .string({
      required_error: 'La misión es requerida',
    })
    .nonempty()
    .optional(),
  vision: z
    .string({
      required_error: 'La visión es requerida',
    })
    .nonempty()
    .optional(),
})

export const newDegreeProgramObjectiveSchema = z.object({
  description: z
    .string({
      required_error: 'El objetivo es requerido',
    })
    .max(255)
    .nonempty('El objetivo es requerido'),
  degreeProgramCode: z
    .string({
      required_error: 'El código del programa es requerido',
    })
    .nonempty('El código del programa es requerido'),
})

export const newDegreeProgramProfileSchema = z.object({
  title: z
    .string({
      required_error: 'El título es requerido',
    })
    .max(191, 'El título no puede tener más de 191 caracteres')
    .nonempty('El título es requerido'),
  description: z
    .string({
      required_error: 'La descripción es requerida',
    })
    .max(191, 'La descripción no puede tener más de 255 caracteres')
    .nonempty('La descripción es requerida'),
  degreeProgramCode: z
    .string({
      required_error: 'El código del programa es requerido',
    })
    .nonempty('El código del programa es requerido'),
})
