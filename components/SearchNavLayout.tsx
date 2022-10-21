import React from 'react'
import Search from './Search'
import SearchNav from './SearchNav'

const SearchNavLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div >
        <Search />
        <div className=' px-16 lg:px-24 bg-black py-4 ' >
            <SearchNav />

        </div>
        {children}
    </div>
  )
}

export default SearchNavLayout