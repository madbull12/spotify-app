import Image from 'next/image'
import React from 'react'
import Card from './Card'

interface IProps {
    albums:SpotifyApi.AlbumObjectSimplified[] | undefined
}
const AlbumSearch = ({ albums }:IProps) => {
  return (
    <div>
        <h1 className='font-bold text-white mb-4 text-2xl'>Albums</h1>
        
        <div className='grid grid-cols-5 gap-x-4'>
            {albums?.slice(0,5).map((album)=>(
            <Card>
                <div className='space-y-3'>
                    <Image
                        src={album.images[1].url}
                        height={album.images[1].height}
                        width={album.images[1].width}
                    />
                    <p className="font-semibold text-white">
                        {album.name}
                    </p>
                    <p className='text-gray-400 '>
                        {album.release_date.slice(0,4)} {album.artists[0].name}
                    </p>

                </div>
            </Card>
            ))}
            
        </div>

    </div>
  )
}

export default AlbumSearch