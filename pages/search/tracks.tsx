import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React,{ ReactElement,useEffect } from 'react'
import { BsClock } from 'react-icons/bs'
import { v4 } from 'uuid'
import Loader from '../../components/Loader'

import SearchNavLayout from '../../components/SearchNavLayout'
import TrackAlbum from '../../components/TrackAlbum'
import useDebounce from '../../hooks/useDebounce'
import spotifyApi from '../../lib/spotifyApi'
import { useSearch } from '../../lib/zustand'

const TrackPage = () => {
  const search = useSearch((state)=>state.search);
  const debouncedSearch = useDebounce(search,500);

  const { data: session } = useSession();
  const { accessToken }: any = session;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);


  const fetchSearchTracks = async()=>{
    const res = await spotifyApi.searchTracks(debouncedSearch,{
      limit:40
    });
    return await res.body;

  }

  

  const { data: searchTracks,isLoading,refetch } = useQuery(["fetchSearchTracks"],fetchSearchTracks);
  console.log();

  useEffect(()=>{
    refetch()
  },[debouncedSearch])

  if(isLoading) return <Loader />
  return (
    <div >
      <header className='sticky bg-black  p-4 top-0 flex items-center text-gray-400 gap-x-4'>
        <p>#</p>
        <p className='flex-[0.5]'>TITLE</p>
        <p className='flex-[0.5]'>ALBUM</p>
        <BsClock />
      </header>
      {searchTracks?.tracks?.items.map((track,i)=>(
        <TrackAlbum track={track} key={v4()} index={i+1} />
      ))}
    </div>
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