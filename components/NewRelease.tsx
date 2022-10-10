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

interface IProps {
  items: IAlbum;
}
const NewRelease = ({ items }: IProps) => {
  console.log(items);
  // const [play, setPlay] = useRecoilState(playState);
  // const [playingTrack, setPlayingTrack] =
  //   useRecoilState<any>(playingTrackState);
  const [hasLiked, setHasLiked] = useState(false);

  // const handlePlay = () => {
  //   setPlayingTrack(items);

  //   if (items.uri === playingTrack.uri) {
  //     setPlay(!play);
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
      {/* {onHover && (
        <div onClick={handlePlay} className="rounded-full absolute right-2 bottom-6 grid place-items-center bg-green-500 w-8 h-8">
          {play ? (
            <FaPause className="text-white"  />
          ):(
            <FaPlay className="text-white"  />

          )}
        </div>
      )} */}
  
    </div>
  );
};

export default NewRelease;
