import SearchMonographForm from '~/components/monographs/search-monograph.form'

const DashboardMainPage = () => {
  return (
    <section className='app-container app-grid app-items-center app-justify-center app-gap-6'>
      <div className='app-mx-auto app-flex app-flex-col app-items-start app-gap-4 lg:app-w-[52rem]'>
        <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
          Ingresa el título a buscar
        </h1>

        <SearchMonographForm />
      </div>
    </section>
  )
}

export default DashboardMainPage
