import React,{ useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { IoIosSettings } from 'react-icons/io'
import { HiViewGrid } from 'react-icons/hi'
import { AiFillBell } from 'react-icons/ai'
import Dropdown from './Dropdown'
import RecentlyPlayed from './RecentlyPlayed'
import spotifyApi from '../lib/spotifyApi'
import { IRecentlyPlayed, ITrack } from '../interface'
import { v4 } from 'uuid'

const Right = () => {
  const { data: session } = useSession();
  const  accessToken  = session?.accessToken;
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>([]);
  useEffect(() => {
    if (!accessToken) return;
    const fetchRecentlyPlayed = async() => {
      try {
        const data = await  spotifyApi.getMyRecentlyPlayedTracks({ limit:20 });
        console.log(data)
       setRecentlyPlayed(data?.body.items);
      } catch(err) {
        console.log(err)
      }
    }

    fetchRecentlyPlayed();

    // spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res:any) => {
    //   setRecentlyPlayed(
    //     res.body.items.map(({ track }:any) => {
    //       return {
    //         id: track.id,
    //         artist: track.artists[0].name,
    //         title: track.name,
    //         uri: track.uri,
    //         albumUrl: track.album.images[0].url,
    //       };
    //     })
    //   );
    // });
  }, [accessToken]);
  console.log(recentlyPlayed)

  return (
    <>

      <div className='p-4 space-y-8 pr-8 bg-black w-[300px] fixed right-0 top-0 bottom-0 z-50 '>
        {session ? (
          <>
            <div className="flex space-x-2 items-center justify-between">
          <div className="items-center space-x-4 border-2 px-2 rounded-full h-8 hidden sm:flex">
              <BsShieldFillCheck className="text-white text-lg cursor-pointer" />
              <IoIosSettings className="text-white text-lg cursor-pointer" />

              <AiFillBell className="text-white text-lg cursor-pointer" />
          </div>
          <Dropdown  />
        </div>
        
      <div className="bg-[#0D0D0D] border-2 border-white p-4 rounded-xl space-y-4 hidden sm:block">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <HiViewGrid className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {recentlyPlayed.map((track:IRecentlyPlayed) => (
            <RecentlyPlayed
              key={v4()}
              track={track}
              
            />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
          View All
        </button>
      </div>
        
          </>
        ):(
          null
        )}
        
      </div>


    </>
    
 

  )
}

export default Right