import { z } from 'zod'

export const newStudentSchema = z.object({
  id: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
  idType: z
    .string({
      required_error: 'Debe digitar este campo',
    })
    .min(1, 'Debe digitar este campo')
    .max(2, 'Máximo 2 caracteres'),
  name: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(128, 'Máximo 128 caracteres'),
  email: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(256, 'Máximo 256 caracteres')
    .email('Debe digitar un correo válido')
    // email ends with @unicesar.edu.co
    .refine(
      (email) => email.endsWith('@unicesar.edu.co'),
      'El correo debe terminar con @unicesar.edu.co',
    ),
  phone: z
    .string()
    .min(1, 'Debe digitar este campo')
    .max(10, 'Máximo 10 caracteres'),
  userId: z.string().min(1, 'Debe digitar este campo').max(128),
})

export * from './src/schemas/monograph'
export * from './src/schemas/degree-program'
export * from './src/schemas/document'
export * from './src/schemas/research-seminar'
