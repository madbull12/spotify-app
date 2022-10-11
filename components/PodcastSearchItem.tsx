import Image from 'next/image'
import React from 'react'
import Card from './Card'

interface IProps {
    show:SpotifyApi.ShowObjectSimplified
}
const PodcastSearchItem = ({ show }:IProps ) => {
  return (
    <div >
    <Card>
        <div className='space-y-3 relative group '>
            <div className='relative'>
                <Image
                    src={show.images[0].url}
                    height={150}
                    width={150}
                    className="rounded-md"
                />
            
            
            </div>
        
            <p className="font-semibold text-white w-[120px]">
                {show.name}
            </p>
            {/* <p className='text-gray-400 text-sm'>
                {episode.release_date} . {msToTime(episode.duration_ms)}
            </p> */}
        
        </div>
    </Card>
</div>
  )
}

export default PodcastSearchItem