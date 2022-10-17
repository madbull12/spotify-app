import Image from 'next/image'
import React from 'react'
import { FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import timeConversion from '../helper/timeConversion'
import useHandlePlay from '../hooks/useHandlePlay'
import PlayButton from './PlayButton'
import NoImage from '../public/img/no-image.jpg'

interface IProps {
    data:any
}
const Banner = ({ data }:IProps) => {
    const handlePlay = useHandlePlay();
  return (
    <div>
 <div className='flex items-center gap-x-8 text-white'>
            <Image 
                src={data?.images[0].url ?? NoImage}
                height={250}
                width={250}
                objectFit="cover"
            
            />
            <div className='space-y-8'>
                <p className='uppercase font-semibold tracking-tighter'>{data?.type}</p>
                <h1 className='font-black text-6xl'>{data?.name}</h1>
                <div className='flex items-center gap-x-2 font-semibold text-sm'>
                  
                    <p>{data?.artists[0].name && data?.owner.display_name } </p>
                    <p>{data?.release_date.slice(0,4)}</p>
                    <p>{data?.total_tracks} tracks,</p>
                    <p>
                        {timeConversion(durations)}
                    </p>

                </div>
            </div>
            
        </div>
        <div className='p-4 flex items-center gap-x-6'>
          <PlayButton large={true} handlePlay={handlePlay} item={data?.uri} />
          <FiHeart className='text-4xl text-gray-400 ' />
          <FiMoreHorizontal className='text-4xl text-gray-400' />
        </div>
    </div>
   
  )
}

export default Banner