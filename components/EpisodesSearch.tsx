import React from 'react'
import { v4 } from 'uuid'
import EpisodeSearchItem from './EpisodeSearchItem'

interface IProps {
    episodes:SpotifyApi.EpisodeObjectSimplified[] | undefined
}
const EpisodesSearch = ({ episodes }:IProps) => {
  return (
    <div>
        <h1 className='font-bold text-white mb-4 text-2xl'>Episodes</h1>
        
        <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
            {episodes?.slice(0,5).map((episode)=>(
                <EpisodeSearchItem key={v4()} episode={episode} />
        
            ))}
            
        </div>

    </div>
  )
}

export default EpisodesSearch