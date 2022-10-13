import { useRouter } from 'next/router';
import React,{ useState } from 'react'
import spotifyApi from '../../lib/spotifyApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Loader from '../../components/Loader';
import timeConversion from '../../helper/timeConversion';
import PlayButton from '../../components/PlayButton';
import { FiHeart,FiMoreHorizontal } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs';
import TrackSearch from '../../components/TrackSearch';
import TrackAlbum from '../../components/TrackAlbum';

const AlbumPage = () => {
    const router:any = useRouter();

    
    const fetchAlbum =async()=>{
        const res = await spotifyApi.getAlbum(router?.query.albumId);
        return await res.body;
    }
    const { data,isError,isLoading } = useQuery(["getAlbum"],fetchAlbum,{
        staleTime:100000
    });

    let durations:any = data?.tracks.items.reduce((acc,cur)=>cur.duration_ms + acc,0)
    if(isLoading) return (
      <div className='flex items-center justify-center'>
         <Loader />

        </div>
    )
    console.log(data)
  return (
    <div className='py-8'>
        <div className='flex items-center gap-x-8 text-white'>
            <Image 
                src={data?.images[1].url ?? ""}
                height={250}
                width={250}
                objectFit="cover"
            
            />
            <div className='space-y-8'>
                <p className='uppercase font-semibold tracking-tighter'>{data?.type}</p>
                <h1 className='font-black text-6xl'>{data?.name}</h1>
                <div className='flex items-center gap-x-2 font-semibold text-sm'>
                  
                    <p>{data?.artists[0].name}</p>
                    <p>{data?.release_date.slice(0,4)}</p>
                    <p>{data?.total_tracks} tracks,</p>
                    <p>
                        {timeConversion(durations)}
                    </p>

                </div>
            </div>
            
        </div>
        <div className='p-4 flex items-center gap-x-6'>
          <PlayButton large={true} />
          <FiHeart className='text-4xl text-gray-400 ' />
          <FiMoreHorizontal className='text-4xl text-gray-400' />
        </div>
        <div className="flex flex-col text-gray-400">
          <div className='flex items-center  gap-x-4 px-4'>
            <span>#</span>
            <span className='flex-1'>TITLE</span>
            <BsClock />
          </div >
            {data?.tracks.items.map((track,i:number)=>(
              <TrackAlbum track={track} index={i+1}/>
            ))}
       
        </div>
    </div>
  )
}

export default AlbumPage