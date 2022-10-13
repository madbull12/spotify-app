import React from 'react'
import msToClock from '../helper/msToClock';

interface IProps {
    track:SpotifyApi.TrackObjectSimplified;
    index:number;
}
const TrackAlbum = ({ track,index }:IProps) => {
  return (
    <div className='flex gap-x-4 items-center py-2 '>
        <span>{index}</span>
        <div className='flex flex-col items-start flex-1'>
            <p className='text-white'>{track.name}</p>
            <div className='flex items-center gap-x-1'>
                {track.explicit && (
                    <span className='rounded-md bg-gray-400 text-black text-xs w-4 h-4 grid place-items-center'>E</span>

                )}
                <p>
                    {track.artists[0].name}
                </p>
            </div>

        </div>
        <p>{msToClock(track.duration_ms)}</p>

    </div>
  )
}

export default TrackAlbum