import React from 'react'
import ArtistSearchItem from './ArtistSearchItem'

interface IProps {
    artists:SpotifyApi.ArtistObjectFull[] | undefined
}
const ArtistsSearch = ({ artists }:IProps ) => {
  return (
    <div>
        <h1 className='font-bold text-white mb-4 text-2xl'>Artists</h1>
        
        <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
            {artists?.slice(0,5).map((artist)=>(
                <ArtistSearchItem artist={artist} />
        
            ))}
            
        </div>

    </div>
  )
}

export default ArtistsSearch