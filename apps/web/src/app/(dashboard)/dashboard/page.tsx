import SearchMonographForm from '~/components/monographs/search-monograph.form'

const DashboardMainPage = () => {
  return (
    <section className='app-items-center app-gap-6'>
      <div className='app-mx-auto app-flex app-flex-col app-items-start app-gap-4'>
        <h1 className='app-font-heading app-text-3xl md:app-text-4xl'>
          Ingresa el título a buscar
        </h1>

        <SearchMonographForm />
      </div>
    </section>
  )
}

export default DashboardMainPage
