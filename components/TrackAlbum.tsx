import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import msToClock from "../helper/msToClock";
import useHandlePlay from "../hooks/useHandlePlay";
import useHover from "../hooks/useHover";
import useOnClickOutside from "../hooks/useOutsideClick";
import { usePlayTrack, useSaveTrack } from "../lib/zustand";
import PlaylistMenu from "./PlaylistMenu";

interface IProps {
  track: SpotifyApi.TrackObjectFull | any;
  index: number;
}
const TrackAlbum = ({ track, index }: IProps) => {
  console.log(track);
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();
  const playingTrack = usePlayTrack((state) => state.playingTrack);
  const isPlaying = usePlayTrack((state) => state.isPlaying);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const clickOutsidehandler = () => {
    setShowMenu(false);
  };

  const handlePlay = useHandlePlay();

  const setSavedTrack = useSaveTrack((state) => state.setSavedTrack);

  return (
    <div
      onClick={() => handlePlay(track)}
      ref={hoverRef}
      className="flex gap-x-2 md:gap-x-4 items-center py-1 px-2 justify-between text-center md:py-2 cursor-pointer hover:bg-neutral-800 rounded-lg md:px-4"
    >
      {isHovering ? (
        <>
          {track?.uri === playingTrack?.uri && isPlaying ? (
            <FaPause className="text-white text-xl hidden md:block" />
          ) : (
            <FaPlay className="text-white text-xl hidden md:block" />
          )}
        </>
      ) : (
        <span className="text-gray-400 hidden md:block">{index}</span>
      )}

      <div className="flex flex-col items-start md:flex[0.5]  whitespace-nowrap text-sm md:text-base">
        {track?.uri === playingTrack?.uri && isPlaying ? (
          <p className="  text-sm md:text-base text-green-500 max-w-[100px] truncate">
            {track?.name}
          </p>
        ) : (
          <p className=" text-white text-sm md:text-base  max-w-[100px] truncate">
            {track?.name}
        </p>
        )}

        <div className="flex items-center gap-x-1">
          {track?.explicit && (
            <span className="rounded-sm bg-gray-400 text-black text-xs w-4 h-4 grid place-items-center">
              E
            </span>
          )}
          <Link href={`/artist/${track?.artists[0].id}`}>
            <p className="text-gray-400 hover:underline text-xs md:text-sm cursor-pointer ">
              {track?.artists[0].name}
            </p>
          </Link>
        </div>
      </div>
      <p className="text-gray-400 hidden md:block flex-[0.5] truncate">
        {track?.album?.name}
      </p>

      <FiHeart
        className={` ${isHovering ? "visible" : "invisible"} text-gray-400`}
      />

      <p className="text-gray-400 hidden md:block text-sm md:text-base">
        {msToClock(track?.duration_ms)}
      </p>
      <div className="relative">
        <FiMoreHorizontal
          // data-tip={`Other options for ${track.name} by ${track.artists[0].name}`}
          className={` ${isHovering ? "visible" : "invisible"} text-gray-400`}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
            setSavedTrack(track);
          }}
        />
        {showMenu && <PlaylistMenu clickOutsideHandler={clickOutsidehandler} />}
      </div>
    </div>
  );
};

export default TrackAlbum;
