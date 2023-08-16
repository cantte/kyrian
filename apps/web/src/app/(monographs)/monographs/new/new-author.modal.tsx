'use client'

import { type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newAuthorSchema } from '@kyrian/api/src/schemas/monograph'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@kyrian/ui'

export type NewAuthor = z.infer<typeof newAuthorSchema>

type NewAuthorModalProps = {
  isOpen: boolean

  onClose: () => void
  onSubmit: (values: NewAuthor) => void
}

const NewAuthorModal: FC<NewAuthorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewAuthor>({
    resolver: zodResolver(newAuthorSchema),
    defaultValues: {
      id: undefined,
    },
  })

  const onSubmitForm: SubmitHandler<NewAuthor> = (values) => {
    onSubmit(values)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Agregar autor</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <form
            className='grid w-full gap-6'
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='name'>Nombre</Label>
              <Input id='name' type='text' {...register('name')} />

              {errors.name !== undefined ? (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              ) : (
                <p className='text-sm text-slate-500'>
                  Digite el nombre del autor
                </p>
              )}
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='id'>Id (Opcional)</Label>
              <Input id='id' type='text' {...register('id')} />

              {errors.id !== undefined ? (
                <p className='text-sm text-red-500'>{errors.id.message}</p>
              ) : (
                <p className='text-sm text-slate-500'>Digite el id del autor</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='secondary'
                className='mt-3 sm:mt-0'
                onClick={() => {
                  reset()
                  onClose()
                }}
              >
                Cancelar
              </Button>

              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Agregar autor
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewAuthorModal
