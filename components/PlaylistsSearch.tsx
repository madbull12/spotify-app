import React from 'react'
import PlaylistSearchItem from './PlaylistSearchItem'

interface IProps {
    playlists:SpotifyApi.PlaylistObjectSimplified[] | undefined
}
const PlaylistsSearch = ({ playlists }:IProps) => {
  return (
    <div>
        <h1 className='font-bold text-white mb-4 text-2xl'>Playlists</h1>
        
        <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
            {playlists?.slice(0,5).map((playlist)=>(
                <PlaylistSearchItem playlist={playlist} />
        
            ))}
            
        </div>

    </div>
  )
}

export default PlaylistsSearch