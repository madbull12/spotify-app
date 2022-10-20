import React,{ ReactElement } from 'react'

import SearchNavLayout from '../../layouts/SearchNavLayout'

const TrackPage = () => {
  return (
    <div>TrackPage</div>
  )
}

TrackPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <SearchNavLayout>
                

                {page}


            </SearchNavLayout>
        </>
  
    )
  }


export default TrackPage