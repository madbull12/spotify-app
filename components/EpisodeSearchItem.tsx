import Image from 'next/image';
import React from 'react'
import Card from './Card';

interface IProps {
    episode:SpotifyApi.EpisodeObjectSimplified;
}

const EpisodeSearchItem = ({ episode }:IProps ) => {

    return (
      <div >
          <Card>
              <div className='space-y-3 relative group '>
                  <div className='relative'>
                      <Image
                          src={episode.images[0].url}
                          height={150}
                          width={150}
                          className="rounded-md"
                      />
                  
                  
                  </div>
              
                  <p className="font-semibold text-white w-[120px]">
                      {episode.name}
                  </p>
                  {/* <p className='text-gray-400 '>
                      {episode.}
                  </p> */}
              
              </div>
          </Card>
      </div>
    )
}

export default EpisodeSearchItem