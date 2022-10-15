import React, { useState } from "react";
import Image from "next/image";
import {
  BsFillPauseFill,
  BsPlayFill,
  BsHeadphones,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { IAlbum } from "../interface";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaPause, FaPlay, FaPlayCircle } from "react-icons/fa";
import { usePlayTrack } from "../lib/zustand";
import shallow from "zustand/shallow";

interface IProps {
  items: SpotifyApi.AlbumObjectFull;
  handlePlay:(items:SpotifyApi.AlbumObjectFull) => void
}
const NewRelease = ({ items,handlePlay }: IProps) => {
  console.log(items);
  const [playingTrack, setPlayingTrack] = usePlayTrack((state:any)=>[state.playingTrack,state.setPlayingTrack],shallow)
  const [isPlaying,setIsPlaying] = usePlayTrack((state:any)=>[state.isPlaying,state.setIsPlaying],shallow);

  // const [hasLiked, setHasLiked] = useState(false);
  console.log(playingTrack)
  // const handlePlay = () => {
  //   setPlayingTrack(items);

  //   if (items.uri === playingTrack.uri) {
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className=" overflow-hidden  rounded-xl relative"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Image
        className="rounded-xl transition-all duration-150 ease-in-out cursor-pointer object-fit hover:scale-105 overflow-visible "
        src={items.images[1].url}
        height={items.images[1].height}
        width={items.images[1].width}
      />
      {onHover && (
        <div onClick={()=>handlePlay(items)} className="rounded-full absolute right-2 bottom-6 grid place-items-center bg-green-500 w-8 h-8">
          {items.uri === playingTrack.uri && isPlaying  ? (
            <FaPause className="text-white"  />
          ):(
            <FaPlay className="text-white"  />

          )}
        </div>
      )}
  
    </div>
  );
};

export default NewRelease;
