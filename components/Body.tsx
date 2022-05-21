import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Search from './Search'

const Body = ({ spotifyApi }:any) => {
    const { data: session } = useSession();
    const { accessToken }:any = session;
    const [search,setSearch] = useState<string>("");
    const [searchResult,setSearchResult] = useState<any>(null);
    const [newReleases,setNewReleases] = useState<any>(null);


    useEffect(()=>{
      if(!accessToken) return;
      
    },[])

  return (
    <section className="bg-black ml-[5.5rem] p-4 space-y-8 md:max-w-5xl flex-grow md:mr-2.5">
        <Search search={search} setSearch={setSearch} />
        <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-x-4 gap-y-8">

        </div>
    </section>
  )
}

export default Body