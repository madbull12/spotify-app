import React,{ useState } from 'react'
import { FaHeart, FaPlay } from 'react-icons/fa';
import { FiHeart, FiMoreHorizontal } from 'react-icons/fi';
import msToClock from '../helper/msToClock';

interface IProps {
    track:SpotifyApi.TrackObjectSimplified;
    index:number;
}
const TrackAlbum = ({ track,index }:IProps) => {
    const [hovered,setIsHovered] = useState<boolean>(false);


  return (
    <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className='flex gap-x-4 items-center py-2 hover:bg-neutral-800 rounded-lg px-4'>
        {hovered ? (
            <FaPlay className='text-xs' />
        ):(
            <span>{index}</span>

        )}
        <div className='flex flex-col items-start flex-1'>
            <p className='text-white'>{track.name}</p>
            <div className='flex items-center gap-x-1'>
                {track.explicit && (
                    <span className='rounded-sm bg-gray-400 text-black text-xs w-4 h-4 grid place-items-center'>E</span>

                )}
                <p>
                    {track.artists[0].name}
                </p>
            </div>

        </div>
       
        <FiHeart className={` ${hovered ? "visible" : "invisible"}`} />
        <p>{msToClock(track.duration_ms)}</p>
        <FiMoreHorizontal className={` ${hovered ? "visible" : "invisible"}`} />
    </div>
  )
}

export default TrackAlbum