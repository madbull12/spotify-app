import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlineShortText } from 'react-icons/md'

interface Props {
    search:string;
    setSearch:(value:string)=>void
}

const Search = ({ search,setSearch }:Props) => {
  return (
      <div className="max-w-5xl flex items-center bg-[#2e2e2e] rounded-lg overflow-hidden space-x-2 items-center p-2">
        <IoMdSearch className='text-white text-3xl animate-pulse' />
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="bg-transparent outline-none text-white border-none w-full " placeholder="Search..." />
        <div className="flex items-center divide-x  divide-gray-700">
            <div className='flex space-x-4 pr-5'>
                <button className="tag">
                    Minimal
                </button>
                <button className="tag">
                House
                </button>
                        
                <button className="tag">
                    Minimal
                </button>
            </div>
            <div className='flex items-center space-x-2 text-[#cecece] '>
                <MdOutlineShortText className='text-3xl animate-pulse'/>
                <span>Filters</span>
            </div>
        </div>
      </div>
  )
}

export default Search