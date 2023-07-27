import { z } from 'zod'

export const newResearchSeminarSchema = z.object({
  name: z
    .string({
      required_error: 'Este campo es requerido',
    })
    .min(1, 'Debe digitar este campo')
    .max(191, 'Máximo 191 caracteres'),
  description: z.string().max(65535, 'Máximo 65535 caracteres').optional(),
  isActive: z.coerce.boolean().optional().default(false),
  creation: z.coerce
    .date()
    .optional()
    .refine(
      (date) => (date !== undefined ? date.getTime() <= Date.now() : true),
      {
        message: 'La fecha de creación no puede ser mayor a la fecha actual',
      },
    ),
  expiration: z.coerce
    .date()
    .optional()
    .refine(
      (date) => (date !== undefined ? date.getTime() >= Date.now() : true),
      {
        message: 'La fecha de expiración no puede ser menor a la fecha actual',
      },
    ),
  students: z.array(z.string()).optional(),
})
