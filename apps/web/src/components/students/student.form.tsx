'use client'

import { type NextComponentType, type NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Student } from '@prisma/client'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newStudentSchema } from '@kyrian/api/schemas'
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

import { api } from '~/utils/api'

type NewStudentValues = Omit<Student, 'createdAt' | 'updatedAt'>

export type StudentFormProps = {
  defaultValues?: Partial<NewStudentValues>
}

type StudentFormValues = z.infer<typeof newStudentSchema>

const StudentForm: NextPage<StudentFormProps> = ({ defaultValues }) => {
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

  const { mutate } = api.student.create.useMutation()
  const onSubmit: SubmitHandler<StudentFormValues> = (values) => {
    mutate(values)
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

export default api.withTRPC(StudentForm) as NextComponentType<
  any,
  any,
  StudentFormProps
>
