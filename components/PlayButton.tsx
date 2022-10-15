import React from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import shallow from 'zustand/shallow';
import { usePlayTrack } from '../lib/zustand';

interface IProps {
  large?:boolean;
  handlePlay:(items:any) => void;
  item:any;
}
const PlayButton = ({ large,handlePlay,item }:IProps) => {
  const isPlaying = usePlayTrack((state) => state.isPlaying);

  const playingTrack = usePlayTrack((state) => state.playingTrack)
  return (
   
    <div onClick={(e)=>{
      e.stopPropagation()
      handlePlay(item)
    }} className={` cursor-pointer ${large ? "w-14 h-14" : "w-10 h-10"} rounded-full bg-green-500 grid place-items-center`}>
         {item?.uri === playingTrack?.uri && isPlaying  ? (
            <FaPause className="text-white"  />
          ):(
            <FaPlay className="text-white"  />

          )}
        {/* <FaPlay className={`${large ? "text-2xl" : null}`}  /> */}
    </div>

  )
}

export default PlayButton