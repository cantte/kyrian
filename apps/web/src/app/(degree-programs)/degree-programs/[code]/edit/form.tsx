'use client'

import { useState, type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type DegreeProgram } from '@prisma/client'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'

import { newDegreeProgramSchema } from '@kyrian/api/schemas'
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@kyrian/ui'

import {
  DegreeProgramObjectivesForm,
  type DegreeProgramObjectiveFormValues,
} from '~/components/degree-programs'

type EditProgramFormProps = {
  degreeProgram: DegreeProgram
}

const editDegreeProgramSchema = newDegreeProgramSchema.extend({
  history: z.string().max(1024).nonempty(),
  mission: z.string().max(1024).nonempty(),
  vision: z.string().max(1024).nonempty(),
  objectives: z.array(
    z.object({
      description: z.string().max(1024).nonempty(),
    }),
  ),
})

type DegreeProgramFormValues = z.infer<typeof editDegreeProgramSchema>

const useEditProgramForm = (degreeProgram: DegreeProgram) => {
  return useForm<DegreeProgramFormValues>({
    defaultValues: {
      ...degreeProgram,
      history: degreeProgram.history ?? '',
      mission: degreeProgram.mission ?? '',
      vision: degreeProgram.vision ?? '',
      phone: degreeProgram.phone ?? '',
    },
    resolver: zodResolver(editDegreeProgramSchema),
  })
}

const EditDegreeProgramForm: FC<EditProgramFormProps> = ({ degreeProgram }) => {
  const form = useEditProgramForm(degreeProgram)

  const { watch, setValue } = form

  const onSubmit: SubmitHandler<DegreeProgramFormValues> = (values) => {
    console.log(values)
  }

  const [isObjectiveDialogOpen, setIsObjectiveDialogOpen] = useState(false)
  const onAddObjective = (objective: DegreeProgramObjectiveFormValues) => {
    const objectives = watch('objectives')
    setValue('objectives', [...objectives, objective])
    setIsObjectiveDialogOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='app-space-y-8 app-grid'
      >
        <Tabs defaultValue='main'>
          <TabsList>
            <TabsTrigger value='main'>Información general</TabsTrigger>
            <TabsTrigger value='about'>Acerca de</TabsTrigger>
            <TabsTrigger value='objectives'>Objetivos</TabsTrigger>
            <TabsTrigger value='profiles'>Perfiles</TabsTrigger>
          </TabsList>

          <TabsContent value='main' className='app-px-2 app-py-2'>
            <div className='app-grid app-w-full app-gap-2 md:app-grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='name'>Nombre</FormLabel>
                    <FormControl>
                      <Input id='name' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='degree'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='degree'>Titulación</FormLabel>
                    <FormControl>
                      <Input id='degree' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='state'>Departamento</FormLabel>
                    <FormControl>
                      <Input id='state' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='city'>Ciudad</FormLabel>
                    <FormControl>
                      <Input id='city' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='credits'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='credits'>Número de créditos</FormLabel>
                    <FormControl>
                      <Input id='credits' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='duration'>
                      Duración (semestres)
                    </FormLabel>
                    <FormControl>
                      <Input id='duration' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='modality'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='modality'>Modalidad</FormLabel>
                    <FormControl>
                      <Input id='modality' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='phone'>Teléfono</FormLabel>
                    <FormControl>
                      <Input id='phone' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input id='email' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value='about' className='app-px-2 app-py-2'>
            <div className='app-grid app-w-full app-gap-2 app-grid-cols-1 md:app-grid-cols-2'>
              <FormField
                control={form.control}
                name='history'
                render={({ field }) => (
                  <FormItem className='app-col-span-2'>
                    <FormLabel htmlFor='history'>Historia</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={15}
                        id='history'
                        className='app-resize-none app-h-48'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='mission'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='mission'>Mision</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={15}
                        id='mission'
                        className='app-resize-none app-h-48'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='vision'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='vision'>Visión</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={15}
                        id='vision'
                        className='app-resize-none app-h-48'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value='objectives' className='app-px-2 app-py-2'>
            <div className='app-space-y-2'>
              <Dialog
                open={isObjectiveDialogOpen}
                onOpenChange={(open) => setIsObjectiveDialogOpen(open)}
              >
                <DialogTrigger className='app-mb-2 app-items-start'>
                  <Button onClick={() => setIsObjectiveDialogOpen(true)}>
                    Agregar objetivo
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar objetivo</DialogTitle>
                  </DialogHeader>

                  <DegreeProgramObjectivesForm onSubmit={onAddObjective} />
                </DialogContent>
              </Dialog>

              <Card>
                <CardContent>
                  <ul className='app-list-disc app-list-inside app-leading-7 app-pt-6'>
                    {watch('objectives')?.map((objective, idx) => (
                      <li key={idx}>{objective.description}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='profiles' className='app-px-2 app-py-2'>
            <p className='app-text-xl app-text-muted-foreground'>
              En construcción
            </p>
          </TabsContent>
        </Tabs>

        <Button type='submit'>Guardar</Button>
      </form>
    </Form>
  )
}

export default EditDegreeProgramForm