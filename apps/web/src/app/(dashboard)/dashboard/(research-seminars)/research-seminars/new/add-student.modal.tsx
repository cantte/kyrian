import { useEffect, useState, type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { is } from 'date-fns/locale'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@kyrian/ui'

import { api } from '~/utils/api'

type AddStudentModalProps = {
  isOpen: boolean

  onClose: () => void
  onSubmit: (values: AddStudent) => void
}

const addStudentSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
})

export type AddStudent = z.infer<typeof addStudentSchema>

const AddStudentModal: FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  const form = useForm<AddStudent>({
    resolver: zodResolver(addStudentSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmitForm: SubmitHandler<AddStudent> = (values) => {
    onSubmit(values)
    reset()
    onClose()
  }

  const id = form.watch('id')
  const [findStudent, setFindStudent] = useState(false)
  const { data: student, isLoading: isLoadingStudent } =
    api.student.byId.useQuery(
      { id },
      {
        enabled: findStudent,
      },
    )

  const handleFindStudent = () => {
    setFindStudent(true)
  }

  useEffect(() => {
    if (isLoadingStudent) {
      return
    }

    setFindStudent(false)

    if (student) {
      form.setValue('name', student.name)
    }
  }, [student, isLoadingStudent])

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar estudiante</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <Form {...form}>
            <form
              className='grid w-full gap-6'
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='id'>Identificación</FormLabel>
                    <FormControl>
                      <Input id='id' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {student && (
                <p className='text-sm text-slate-500'>{student.name}</p>
              )}
            </form>
          </Form>
        </div>

        <DialogFooter>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleFindStudent}>Buscar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentModal
