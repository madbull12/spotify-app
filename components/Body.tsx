import React, { useState } from 'react'
import Search from './Search'

const Body = () => {
    const [search,setSearch] = useState<string>("");
    const [searchResult,setSearchResult] = useState<any>(null);

  return (
    <section className="bg-black ml-[5.5rem] p-4 space-y-8 md:max-w-5xl flex-grow md:mr-2.5">
        <Search search={search} setSearch={setSearch} />
        <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-x-4 gap-y-8">

        </div>
    </section>
  )
}

export default Body