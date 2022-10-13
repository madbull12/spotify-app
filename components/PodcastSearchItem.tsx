import Image from 'next/image'
import React from 'react'
import Card from './Card'
import NoImage from '../public/img/no-image.jpg'

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
                    src={show.images[0].url ?? NoImage}
                    height={150}
                    width={150}
                    className="rounded-md"

                />
            
            
            </div>
        
            <p className="font-semibold text-white w-[120px] truncate">
                {show.name}
            </p>
        
        
        </div>
    </Card>
</div>
  )
}

export default PodcastSearchItem