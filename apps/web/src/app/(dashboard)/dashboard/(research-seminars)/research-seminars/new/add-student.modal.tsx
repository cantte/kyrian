import { type FC } from 'react'
import { type z } from 'zod'

import { type newStudentSchema } from '@kyrian/api/schemas'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@kyrian/ui'

export type NewStudent = z.infer<typeof newStudentSchema>

type AddStudentModalProps = {
  isOpen: boolean

  onClose: () => void
  onSubmit: (values: NewStudent) => void
}

const AddStudentModal: FC<AddStudentModalProps> = ({ isOpen, onClose }) => {
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar estudiante</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <div className='flex flex-col space-y-4'>
            formulario en construcción
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentModal
