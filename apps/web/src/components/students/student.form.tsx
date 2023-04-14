'use client'

import { type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Student } from '@prisma/client'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kyrian/ui'

type NewStudentValues = Omit<Student, 'createdAt' | 'updatedAt'>

export type StudentFormProps = {
  defaultValues?: Partial<NewStudentValues>
}

const newStudentSchema = z.object({
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

type StudentFormValues = z.infer<typeof newStudentSchema>

const StudentForm: FC<StudentFormProps> = ({ defaultValues }) => {
  const { name, email, userId } = defaultValues ?? {}

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(newStudentSchema),
    defaultValues: {
      idType: 'CC',
      name: name,
      email: email,
      userId: userId,
    },
  })

  const onSubmit: SubmitHandler<StudentFormValues> = (values) => {
    console.log(values)
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='id'>Identificación</Label>
        <Input
          type='text'
          id='id'
          placeholder='Ejemplo: 1234567890'
          {...register('id')}
        />

        {errors.id !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.id.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite su número de identificación
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='idType'>Tipo de identificación</Label>
        <Select
          onValueChange={(value) => setValue('idType', value)}
          value={watch('idType')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Seleccione una opción' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='CC'>Cédula de ciudadanía</SelectItem>
            <SelectItem value='CE'>Cédula de extranjería</SelectItem>
            <SelectItem value='TI'>Tarjeta de identidad</SelectItem>
          </SelectContent>
        </Select>

        {errors.idType !== undefined ? (
          <p className='app-text-sm app-text-red-500'>
            {errors.idType.message}
          </p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Seleccione el tipo de identificación
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='name'>Nombre</Label>
        <Input type='text' id='name' {...register('name')} />

        {errors.name !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.name.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite su nombre completo
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='email'>Correo electronico</Label>
        <Input type='email' id='email' {...register('email')} />

        {errors.email !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.email.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite su correo electronico
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='phone'>Teléfono</Label>
        <Input
          type='text'
          id='phone'
          placeholder='Ejemplo: 1234567890'
          {...register('phone')}
        />

        {errors.phone !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.phone.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite su número de teléfono
          </p>
        )}
      </div>

      <Button type='submit'>Registrar</Button>
    </form>
  )
}

export default StudentForm