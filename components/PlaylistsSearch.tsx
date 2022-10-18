import React from 'react'
import { v4 } from 'uuid';
import PlaylistSearchItem from './PlaylistSearchItem'

interface IProps {
    playlists:SpotifyApi.PlaylistObjectSimplified[] | undefined;
    title:string | undefined;
}
const PlaylistsSearch = ({ playlists,title }:IProps) => {
  return (
    <div>
        <h1 className='font-bold text-white mb-4 text-2xl'>{title}</h1>
        
        <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
            {playlists?.slice(0,5).map((playlist)=>(
                <PlaylistSearchItem key={v4()} playlist={playlist} />
        
            ))}
            
        </div>

    </div>
  )
}

export default PlaylistsSearch