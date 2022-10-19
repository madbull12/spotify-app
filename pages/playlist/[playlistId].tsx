import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { BsClock } from 'react-icons/bs';
import { FiHeart, FiMoreHorizontal } from 'react-icons/fi';
import PlayButton from '../../components/PlayButton';
import PlaylistTrack from '../../components/PlaylistTrack';
import timeConversion from '../../helper/timeConversion';
import useHandlePlay from '../../hooks/useHandlePlay';
import spotifyApi from '../../lib/spotifyApi';
import NoImage from "../../public/img/no-image.jpg"


const PlaylistPage = () => {
    const router:any = useRouter();
    const { data: session } = useSession();
    const { accessToken }: any = session;


    const handlePlay = useHandlePlay();
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
      }, [accessToken]);
    const fetchPlaylist = async() => {
        const res = await spotifyApi.getPlaylist(router.query.playlistId);
        return await res.body;
    }

    const { data:playlist,refetch } = useQuery(["fetchPlaylist"],fetchPlaylist);
    useEffect(()=>{
        refetch()
    },[router])
    console.log(playlist)
    let durations:any = playlist?.tracks.items.reduce((acc:any,cur:any)=>cur.track.duration_ms + acc,0)

  return (
    <div className=''>
        <div className='flex items-center gap-x-8 text-white'>
            {playlist?.images.length !== 0 ? (
                <Image 
                    src={playlist?.images[0].url ?? NoImage}
                    height={250}
                    width={250}
                    objectFit="cover"

                />
            ):(
                <Image 
                    src={NoImage}
                    height={250}
                    width={250}
                    objectFit="cover"

                />
            )}
        
            <div className='space-y-8'>
                <p className='uppercase font-semibold tracking-tighter'>{playlist?.type}</p>
                <h1 className='font-black text-6xl'>{playlist?.name}</h1>
                <p className='text-gray-400'>{playlist?.description}</p>
                <div className='flex items-center gap-x-2 font-semibold text-sm'>
                  
                    <p>{playlist?.owner.display_name }, </p>
                    <p>{playlist?.followers.total} likes,</p>
                    <p>{playlist?.tracks.items.length} tracks,</p> 
                    <p>
                        {timeConversion(durations)}
                    </p>

                </div>
            </div>
            
        </div>
        <div className='p-4 flex items-center gap-x-6'>
          <PlayButton large={true} handlePlay={()=>handlePlay(playlist)} item={playlist} />
          <FiHeart className='text-4xl text-gray-400 ' />
          <FiMoreHorizontal className='text-4xl text-gray-400' />
        </div>

        <div className='flex flex-col gap-y-4 mt-4'>
            <div className='flex items-center gap-x-4 px-4 py-2 text-gray-400'>
                <p>#</p>
                <p className='flex-[0.5]'>TITLE</p>
                <p className='flex-[0.5]'>ALBUM</p>
                <BsClock />
            
            </div>
            {playlist?.tracks.items.map((playlist:SpotifyApi.PlaylistTrackObject,i)=>(
                <PlaylistTrack i={i} playlist={playlist} />
            ))}
        </div>
  
    </div>
  )
}

export default PlaylistPage