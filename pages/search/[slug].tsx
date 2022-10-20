import { useRouter } from 'next/router';
import React, { ReactElement } from 'react'
import SearchLayout from '../../layouts/SearchLayout'
import spotifyApi from '../../lib/spotifyApi'

const SearchResultPage = () => {
  const router:any = useRouter();

  const fetchSearch = async() => {
    const res = await spotifyApi.searchTracks(router.query.q,[router.query.slug])
  }
  return (
    <div>
        
    </div>
  )
}

// SearchResultPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <SearchLayout>
//       {page}
//     </SearchLayout>
//   )
// }


export default SearchResultPage