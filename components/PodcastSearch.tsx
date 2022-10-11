import React from 'react'
import PodcastSearchItem from './PodcastSearchItem'

interface IProps {
    shows:SpotifyApi.ShowObjectSimplified[] | undefined
}
const PodcastSearch = ({ shows }:IProps) => {
  return (
    <div>
    <h1 className='font-bold text-white mb-4 text-2xl'>Podcasts</h1>
    
    <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
        {shows?.slice(0,5).map((show)=>(
            <PodcastSearchItem show={show} />
    
        ))}
        
    </div>

</div>
  )
}

export default PodcastSearch