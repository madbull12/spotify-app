import Image from 'next/image'
import React from 'react'
import useHandlePlay from '../hooks/useHandlePlay'
import PlayButton from './PlayButton'

interface IProps {
    episode:SpotifyApi.EpisodeObjectSimplified
}
const EpisodeCard = ({ episode }:IProps) => {
    const handlePlay = useHandlePlay();

    console.log(episode)
  return (
    <div className='flex items-center gap-x-6 py-4'>
        <Image
            src={episode.images[0].url}
            height={120}
            width={120}
            className="rounded-lg"
        
        />
        <div className='space-y-2'>
            <p className='text-white font-semibold'>{episode.name}</p>
            <p className='text-gray-400 text-sm'>{episode.description}</p>
            <div className="flex items-center gap-x-4">
                <PlayButton handlePlay={()=>handlePlay(episode)} item={episode} />
                <div>
                    <p className='text-gray-400'>{episode.release_date}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EpisodeCard