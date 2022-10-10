import React from 'react'
import Search from '../components/Search'

const SearchLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <>
        <Search />
        {children}
    </>
  )
}

export default SearchLayout