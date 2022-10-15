import Image from "next/image";
import React, { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import shallow from "zustand/shallow";
import useHandlePlay from "../hooks/useHandlePlay";
import useHover from "../hooks/useHover";
import { usePlayTrack } from "../lib/zustand";

interface IProps {
  track: SpotifyApi.TrackObjectFull;
}
const TrackSearch = ({ track }: IProps) => {
  const playingTrack = usePlayTrack((state) => state.playingTrack);
  const isPlaying = usePlayTrack((state) => state.isPlaying);
  const handlePlay = useHandlePlay();
  const [hoverRef, isHovering] = useHover();


  return (
    <div className="p-2 cursor-pointer hover:bg-zinc-800 rounded-lg" ref={hoverRef} onClick={()=>handlePlay(track)}>
      <div className="gap-x-4 flex items-center">
        <div className="relative">
          <Image
            src={track.album.images[2].url}
            height={45}
            width={45}
          />
          {isHovering && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {track.uri === playingTrack?.uri && isPlaying  ? (
              <FaPause className="text-white"  />
            ):(
              <FaPlay className="text-white"  />

            )}
          </div>
          )}
     
        </div>
  
        <div className="space-y-2">
            <p className="text-white">{track.name}</p>
            <p className="text-gray-400 text-sm">{track.artists[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackSearch;
