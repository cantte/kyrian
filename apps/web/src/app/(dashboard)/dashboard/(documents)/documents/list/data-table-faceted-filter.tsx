import { type ComponentType } from 'react'
import { type Column } from '@tanstack/react-table'

import MonographsDataTableFacetedFilter from '~/app/(dashboard)/dashboard/(monographs)/monographs/list/data-table-faceted-filter'

type DocumentDataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
}

const DocumentDataTableFacetedFilter = <TData, TValue>(
  props: DocumentDataTableFacetedFilterProps<TData, TValue>,
) => {
  return <MonographsDataTableFacetedFilter {...props} />
}

export default DocumentDataTableFacetedFilter
