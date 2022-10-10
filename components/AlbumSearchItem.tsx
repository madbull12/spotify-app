import Image from 'next/image';
import React,{ useState } from 'react'
import { FaPlay } from 'react-icons/fa';
import Card from './Card';

interface IProps {
    album:SpotifyApi.AlbumObjectSimplified
}
const AlbumSearchItem = ({ album }: IProps ) => {
    const [hovered,setHovered] = useState<boolean>(false);

  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <Card>
            <div className='space-y-3 relative '>
                <div className='relative'>
                    <Image
                        src={album.images[1].url}
                        height={album.images[1].height}
                        width={album.images[1].width}
                    />
                    {hovered && (
                        <div className='w-10 absolute bottom-3 right-2 h-10 rounded-full bg-green-500 grid place-items-center'>
                            <FaPlay />
                        </div>
                    )}
                
                </div>
            
                <p className="font-semibold text-white">
                    {album.name}
                </p>
                <p className='text-gray-400 '>
                    {album.release_date.slice(0,4)} {album.artists[0].name}
                </p>
            
            </div>
        </Card>
    </div>
  )
}

export default AlbumSearchItem