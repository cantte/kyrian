import { useEffect, useState, type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
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
  Label,
} from '@kyrian/ui'

import { api } from '~/utils/api'

type AddStudentModalProps = {
  isOpen: boolean

  onClose: () => void
  onSubmit: (values: AddStudent) => void
}

const addStudentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
})

export type AddStudent = z.infer<typeof addStudentSchema>

const AddStudentModal: FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset()
      onClose()
    }
  }

  const form = useForm<AddStudent>({
    resolver: zodResolver(addStudentSchema),
  })

  const { handleSubmit, reset } = form

  const id = form.watch('id')
  const [findStudent, setFindStudent] = useState(false)
  const { data: student, isFetching: isLoadingStudent } =
    api.student.byId.useQuery(
      { id },
      {
        enabled: findStudent,
      },
    )
  const [notFoundStudent, setNotFoundStudent] = useState(false)

  const handleFindStudent = () => {
    form.resetField('name')
    setFindStudent(true)
  }

  useEffect(() => {
    if (isLoadingStudent) {
      return
    }

    setFindStudent(false)
    setNotFoundStudent(student === null)

    if (student) {
      form.setValue('name', student.name)
      return
    }

    form.resetField('name')
  }, [student, isLoadingStudent, form])

  const onSubmitForm: SubmitHandler<AddStudent> = (values) => {
    onSubmit(values)
    reset()
    onClose()
    setFindStudent(false)
    setNotFoundStudent(false)
  }

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

              {notFoundStudent && (
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='id'>Nombre</FormLabel>
                      <FormControl>
                        <Input id='name' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {student && (
                <div className='space-y-2'>
                  <Label>Nombre</Label>
                  <p className='text-muted-foreground border-input rounded-md border p-2 text-sm'>
                    {student.name}
                  </p>
                </div>
              )}

              {(notFoundStudent || student) && (
                <Button type='submit' disabled={isLoadingStudent}>
                  {isLoadingStudent && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Agregar
                </Button>
              )}
            </form>
          </Form>
        </div>

        <DialogFooter>
          <div className='flex justify-end space-x-2'>
            {!notFoundStudent && student === undefined && (
              <Button onClick={handleFindStudent} disabled={isLoadingStudent}>
                {isLoadingStudent && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Buscar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentModal
