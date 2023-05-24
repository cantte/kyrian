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
      <DialogContent className='sm:app-max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Agregar autor</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <form
            className='app-grid app-gap-6 app-w-full'
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div className='app-grid app-w-full app-items-center app-gap-1.5'>
              <Label htmlFor='name'>Nombre</Label>
              <Input id='name' type='text' {...register('name')} />

              {errors.name !== undefined ? (
                <p className='app-text-sm app-text-red-500'>
                  {errors.name.message}
                </p>
              ) : (
                <p className='app-text-sm app-text-slate-500'>
                  Digite el nombre del autor
                </p>
              )}
            </div>

            <div className='app-grid app-w-full app-items-center app-gap-1.5'>
              <Label htmlFor='id'>Id (Opcional)</Label>
              <Input id='id' type='text' {...register('id')} />

              {errors.id !== undefined ? (
                <p className='app-text-sm app-text-red-500'>
                  {errors.id.message}
                </p>
              ) : (
                <p className='app-text-sm app-text-slate-500'>
                  Digite el id del autor
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='secondary'
                className='app-mt-3 sm:app-mt-0'
                onClick={() => {
                  reset()
                  onClose()
                }}
              >
                Cancelar
              </Button>

              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className='app-mr-2 app-h-4 app-w-4 app-animate-spin' />
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
