import React from 'react'
import { FaPlay } from 'react-icons/fa'

interface IProps {
  large?:boolean;
}
const PlayButton = ({ large }:IProps) => {
  return (
   
    <div className={` cursor-pointer ${large ? "w-14 h-14" : "w-10 h-10"} rounded-full bg-green-500 grid place-items-center`}>
        <FaPlay className={`${large ? "text-2xl" : null}`}  />
    </div>

  )
}

export default PlayButton