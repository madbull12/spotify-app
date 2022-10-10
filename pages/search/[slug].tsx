import React, { ReactElement } from 'react'
import SearchLayout from '../../layouts/SearchLayout'

const SearchResultPage = () => {
  return (
    <div>
        
    </div>
  )
}

SearchResultPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SearchLayout>
      {page}
    </SearchLayout>
  )
}


export default SearchResultPage