'use client'

import { useState, useTransition, type ComponentType, type FC } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

import { editDegreeProgramSchema } from '@kyrian/api/schemas'
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
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@kyrian/ui'

import { api, type RouterOutputs } from '~/utils/api'
import {
  DegreeProgramObjectivesForm,
  type DegreeProgramObjectiveFormValues,
} from '~/components/degree-programs'
import DegreeProgramProfilesForm, {
  type DegreeProgramProfileFormValues,
} from '~/components/degree-programs/degree-program-profiles.form'

type EditProgramFormProps = {
  degreeProgram: RouterOutputs['degreeProgram']['read']
}

type DegreeProgramFormValues = z.infer<typeof editDegreeProgramSchema>

const useEditProgramForm = (
  degreeProgram: RouterOutputs['degreeProgram']['read'],
) => {
  return useForm<DegreeProgramFormValues>({
    defaultValues: {
      ...degreeProgram,
      history: degreeProgram?.history ?? '',
      mission: degreeProgram?.mission ?? '',
      vision: degreeProgram?.vision ?? '',
      phone: degreeProgram?.phone ?? '',
    },
    resolver: zodResolver(editDegreeProgramSchema),
  })
}

const useObjectiveOperations = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { mutate: addObjective, isLoading: isAddingObjective } =
    api.degreeProgram.addObjective.useMutation({
      onSuccess: () => {
        startTransition(() => {
          router.refresh()
        })
      },
    })

  const { mutate: removeObjective, isLoading: isRemovingObjective } =
    api.degreeProgram.removeObjective.useMutation({
      onSuccess: () => {
        startTransition(() => {
          router.refresh()
        })
      },
    })

  return {
    addObjective,
    removeObjective,
    isPerformObjectiveOperation: isAddingObjective || isRemovingObjective,
    isPending,
  }
}

const useProfileOperations = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { mutate: addProfile, isLoading: isAddingProfile } =
    api.degreeProgram.addProfile.useMutation({
      onSuccess: () => {
        startTransition(() => {
          router.refresh()
        })
      },
    })

  const { mutate: removeProfile, isLoading: isRemovingProfile } =
    api.degreeProgram.removeProfile.useMutation({
      onSuccess: () => {
        startTransition(() => {
          router.refresh()
        })
      },
    })

  return {
    addProfile,
    removeProfile,
    isPerformProfileOperation: isAddingProfile || isRemovingProfile,
    isPending,
  }
}

const EditDegreeProgramForm: FC<EditProgramFormProps> = ({ degreeProgram }) => {
  const form = useEditProgramForm(degreeProgram)

  const { mutate: editDegreeProgram, isLoading: isEditingDegreeProgram } =
    api.degreeProgram.edit.useMutation()
  const onSubmit: SubmitHandler<DegreeProgramFormValues> = (values) => {
    editDegreeProgram(values)
  }

  const { addObjective, isPerformObjectiveOperation, removeObjective } =
    useObjectiveOperations()
  const [isObjectiveDialogOpen, setIsObjectiveDialogOpen] = useState(false)
  const onAddObjective = (objective: DegreeProgramObjectiveFormValues) => {
    addObjective(objective)
    setIsObjectiveDialogOpen(false)
  }

  const { addProfile, isPerformProfileOperation, removeProfile } =
    useProfileOperations()
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const onAddProfile = (profile: DegreeProgramProfileFormValues) => {
    addProfile(profile)
    setIsProfileDialogOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid space-y-8'>
        <Tabs defaultValue='main'>
          <TabsList>
            <TabsTrigger value='main'>Información general</TabsTrigger>
            <TabsTrigger value='about'>Acerca de</TabsTrigger>
            <TabsTrigger value='objectives'>Objetivos</TabsTrigger>
            <TabsTrigger value='profiles'>Perfiles</TabsTrigger>
          </TabsList>

          <TabsContent value='main' className='px-2 py-2'>
            <div className='grid w-full gap-2 md:grid-cols-2'>
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

              <Button
                type='submit'
                className='col-span-2'
                disabled={isEditingDegreeProgram}
              >
                Guardar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value='about' className='px-2 py-2'>
            <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='history'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel htmlFor='history'>Historia</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={15}
                        id='history'
                        className='h-48 resize-none'
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
                        className='h-48 resize-none'
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
                        className='h-48 resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='col-span-2'
                disabled={isEditingDegreeProgram}
              >
                Guardar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value='objectives' className='px-2 py-2'>
            <div className='space-y-2'>
              <Dialog
                open={isObjectiveDialogOpen}
                onOpenChange={(open) => setIsObjectiveDialogOpen(open)}
              >
                <DialogTrigger className='mb-2 items-start'>
                  <Button
                    type='button'
                    onClick={() => setIsObjectiveDialogOpen(true)}
                    disabled={
                      isEditingDegreeProgram || isPerformObjectiveOperation
                    }
                  >
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
                  <ul className='list-inside list-disc pt-6 leading-7'>
                    {degreeProgram?.objectives?.map((objective, idx) => (
                      <>
                        <li
                          key={idx}
                          className='flex flex-row items-center justify-between space-y-2'
                        >
                          <p>{objective.description}</p>
                          <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            disabled={
                              isEditingDegreeProgram ||
                              isPerformObjectiveOperation
                            }
                            onClick={() =>
                              removeObjective({ id: objective.id })
                            }
                          >
                            <span className='sr-only'>Eliminar</span>
                            <Trash className='h-6 w-6' />
                          </Button>
                        </li>
                        <Separator className='mt-2' />
                      </>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='profiles' className='px-2 py-2'>
            <div className='space-y-2'>
              <Dialog
                open={isProfileDialogOpen}
                onOpenChange={(open) => setIsProfileDialogOpen(open)}
              >
                <DialogTrigger className='mb-2 items-start'>
                  <Button
                    type='button'
                    onClick={() => setIsProfileDialogOpen(true)}
                    disabled={
                      isEditingDegreeProgram || isPerformProfileOperation
                    }
                  >
                    Agregar perfil
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar perfil</DialogTitle>
                  </DialogHeader>

                  <DegreeProgramProfilesForm onSubmit={onAddProfile} />
                </DialogContent>
              </Dialog>

              <Card>
                <CardContent>
                  <ul className='list-inside list-disc pt-6 leading-7'>
                    {degreeProgram?.profiles.map((profile, idx) => (
                      <>
                        <li
                          key={idx}
                          className='flex flex-row items-center justify-between space-y-2'
                        >
                          <div>
                            <strong>{profile.title}</strong>:{' '}
                            <span>{profile.description}</span>
                          </div>

                          <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            disabled={
                              isEditingDegreeProgram ||
                              isPerformProfileOperation
                            }
                            onClick={() => removeProfile({ id: profile.id })}
                          >
                            <span className='sr-only'>Eliminar</span>
                            <Trash className='h-6 w-6' />
                          </Button>
                        </li>

                        <Separator className='mt-2' />
                      </>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}

export default api.withTRPC(
  EditDegreeProgramForm,
) as ComponentType<EditProgramFormProps>
