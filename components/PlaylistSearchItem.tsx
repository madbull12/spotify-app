import Image from 'next/image';
import React, { useState } from 'react'
import Card from './Card';
import PlayButton from './PlayButton';

interface IProps {
    playlist:SpotifyApi.PlaylistObjectSimplified
}
const PlaylistSearchItem = ({ playlist }: IProps ) => {
    const [hovered,setHovered] = useState<boolean>(false);

    return (
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <Card>
          <div className='space-y-3 relative group '>
              <div className='relative'>
                  <Image
                      src={playlist.images[0].url}
                      height={150}
                      width={150}
                      objectFit="cover"
                      className="rounded-md "
                  />
                  {hovered && (
                    <div className='absolute bottom-4 right-4 '>
                      <PlayButton />
  
                    </div>
                  )}
              
              </div>
          
              <p className="font-semibold text-white capitalize truncate">
                   {playlist.name}
              </p>
              <p className='text-gray-400 capitalize'>
                    by {playlist.owner.display_name}
              </p>
          
          </div>
      </Card>
  </div>
    )
}

export default PlaylistSearchItem