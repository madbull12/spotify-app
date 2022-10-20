import React from 'react'
import Search from '../components/Search'
import SearchNav from '../components/SearchNav'

const SearchNavLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <>
        <Search />
        <div className='px-6 py-2 bg-black'>
            <SearchNav />

        </div>
        {children}
    </>
  )
}

export default SearchNavLayout