import React, { ReactElement } from 'react'
import SearchNavLayout from '../../components/SearchNavLayout'

const ArtistsPage = () => {
  return (
    <div>ArtistsPage</div>
  )
}

ArtistsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <>
          <SearchNavLayout>
              

              {page}


          </SearchNavLayout>
      </>

  )
}
export default ArtistsPage