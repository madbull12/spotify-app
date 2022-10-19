import Image from "next/image";
import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import msToClock from "../helper/msToClock";
import useHandlePlay from "../hooks/useHandlePlay";
import useHover from "../hooks/useHover";
import { usePlayTrack } from "../lib/zustand";
import NoImage from '../public/img/no-image.jpg'

interface IProps {
  playlist: SpotifyApi.PlaylistTrackObject;
  i: number;
}
const PlaylistTrack = ({ playlist, i }: IProps) => {
    const playingTrack = usePlayTrack((state) => state.playingTrack);
    const isPlaying = usePlayTrack((state) => state.isPlaying);
    const handlePlay = useHandlePlay();
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();
  return (
    <div onClick={()=>handlePlay(playlist?.track)} className="flex items-center gap-x-4 text-white hover:bg-zinc-800 px-4 py-2 cursor-pointer " ref={hoverRef}>
        {isHovering ? (
            <>
                {playlist?.track?.uri === playingTrack?.uri && isPlaying  ? (
                    <FaPause className="text-white"  />
                ):(
                    <FaPlay className="text-white"  />

                )}
            </>
            
        ):(
            <p>{i + 1}</p>

        )}
      <div className="flex gap-x-2 items-center flex-[0.5]">
     
        {playlist?.track?.album.images.length !== 0 ? (
                <Image 
                    src={playlist.track?.album.images[0].url ?? NoImage}
                    height={40}
                    width={40}
                    objectFit="cover"

                />
            ):(
                <Image 
                    src={NoImage}
                    height={40}
                    width={40}
                    objectFit="cover"

                />
            )}
        <div>
          <p>{playlist?.track?.name}</p>
          <div className="flex items-center gap-x-1">
            {playlist.track?.explicit && (
              <span className="rounded-sm bg-gray-400 text-black text-xs w-4 h-4 grid place-items-center">
                E
              </span>
            )}

            <p className="text-gray-400">{playlist.track?.artists[0].name}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-400 flex-[0.5]">{playlist?.track?.album.name}</p>
      <p>{msToClock(playlist?.track?.duration_ms ?? 0)}</p>
    </div>
  );
};

export default PlaylistTrack;
