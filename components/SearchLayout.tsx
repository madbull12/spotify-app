import React from 'react'
import Search from '../components/Search'

const SearchLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div >
        <Search />
        {children}
    </div>
  )
}

export default SearchLayout