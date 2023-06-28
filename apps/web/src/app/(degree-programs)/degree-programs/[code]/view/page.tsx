import { type FC } from 'react'

type ViewDegreeProgramPageProps = {
  params: { [key: string]: string | string[] | undefined }
}

const ViewDegreeProgramPage: FC<ViewDegreeProgramPageProps> = ({ params }) => {
  const { code } = params

  return (
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Detalles de {code}
          </h1>
        </div>
      </div>

      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        Está página está en construcción, por favor regrese más tarde.
      </p>
    </div>
  )
}

export default ViewDegreeProgramPage
