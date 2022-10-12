import { useRouter } from 'next/router';
import React from 'react'
import spotifyApi from '../../lib/spotifyApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Loader from '../../components/Loader';

function timeConversion(duration: number) {
    const portions: string[] = [];
  
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }
  
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
    }
  
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 's');
    }
  
    return portions.join(' ');
  }



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
                <div className='flex items-center gap-x-2 font-semibold'>
                  
                    <p>{data?.artists[0].name}</p>
                    <p>{data?.release_date.slice(0,4)}</p>
                    <p>{data?.total_tracks} tracks,</p>
                    <p>
                        {timeConversion(durations)}
                    </p>

                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AlbumPage