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

const Card = ({ items, chooseTrack }: any) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] =
    useRecoilState<any>(playingTrackState);
  const [hasLiked, setHasLiked] = useState(false);

  const handlePlay = () => {
    setPlayingTrack(items);

    if (items.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div></div>
  );
};

export default Card;
