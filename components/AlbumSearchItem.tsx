import Image from 'next/image';
import React,{ useState } from 'react'
import { FaPlay } from 'react-icons/fa';
import Card from './Card';
import NoImage from '../public/img/no-image.jpg'
import Link from 'next/link';
import useHover from '../hooks/useHover';
import useHandlePlay from '../hooks/useHandlePlay';
import PlayButton from './PlayButton';

interface IProps {
    album:SpotifyApi.AlbumObjectSimplified
}
const AlbumSearchItem = ({ album }: IProps ) => {
    const [hoverRef,isHovering] = useHover<HTMLDivElement>();

    const handlePlay = useHandlePlay();
  return (
    <div ref={hoverRef}>
        <Card>
            <Link href={`/album/${album.id}`}>
                <div className='space-y-3 relative group '>
                    <div className='relative'>
                        <Image
                            src={album.images[0].url ?? NoImage}
                            height={150}
                            width={150}
                            className="rounded-md"
                        />
                        {isHovering && (
                            <div className='w-10   absolute bottom-4 right-2 h-10 rounded-full bg-green-500 grid place-items-center'>
                                <PlayButton handlePlay={()=>handlePlay(album)} item={album} />
                            </div>
                        )}
                    
                    </div>
                
                    <p className="font-semibold text-white truncate">
                        {album.name}
                    </p>
                    <p className='text-gray-400 '>
                        {album.release_date.slice(0,4)} {album.artists[0].name}
                    </p>
                
                </div>
            </Link>
            
        </Card>
    </div>
  )
}

export default AlbumSearchItem