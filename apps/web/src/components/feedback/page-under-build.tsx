import { Unplug } from 'lucide-react'

const PageUnderBuild = () => {
  return (
    <div className='bg-background p-8 text-center'>
      <Unplug className='mx-auto mb-4 h-24 w-24' />
      <h1 className='mb-4 text-3xl font-bold'>En construcción</h1>
      <p className='text-muted-foreground'>
        Estamos trabajando duro para terminar el desarrollo de este sitio.
      </p>
    </div>
  )
}

export default PageUnderBuild
