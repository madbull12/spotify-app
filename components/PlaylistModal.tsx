import Image from 'next/image'
import React from 'react'
import { MdClose } from 'react-icons/md'
import NoImage from '../public/img/no-image.jpg'

interface IProps {
  isEditing:boolean
}
const PlaylistModal = ({ isEditing }:IProps) => {
  return (
    <div className='p-4 bg-zinc-800 rounded-xl text-white space-y-3'>
      <header className='flex justify-between items-center'>
        <p className='font-bold text-xl'>{isEditing ? "Edit details" : "Create playlist"}</p>
        <MdClose className='text-gray-400' />
      </header>
      <div className='flex items-center gap-x-4'>
        <Image
          src={NoImage}
          height={200}
          width={200}
        />
        <div className='space-y-2 flex flex-col'>
          <input placeholder="Enter playlist's name" className="bg-zinc-600 px-4 py-2 rounded-lg outline-none" />
          <textarea placeholder="Add an optional description " className='px-4 py-2 bg-zinc-600 rounded-lg outline-none'></textarea>
        </div>
      </div>
    </div>
  )
}

export default PlaylistModal