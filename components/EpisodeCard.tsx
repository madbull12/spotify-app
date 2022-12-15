import Image from "next/image";
import React from "react";
import useHandlePlay from "../hooks/useHandlePlay";
import PlayButton from "./PlayButton";

interface IProps {
  episode: SpotifyApi.EpisodeObjectSimplified;
}
const EpisodeCard = ({ episode }: IProps) => {
  const handlePlay = useHandlePlay();

  console.log(episode);
  return (
    <div className="flex items-center gap-x-2 md:gap-x-6 py-4">
      <div className="relative hidden xs:block w-1/2 xs:w-16 h-16">
        <Image
          src={episode.images[0].url}
          layout="fill"
          className="rounded-lg"
        />
      </div>
   
      <div className="space-y-2">
        <p className="text-white font-semibold text-sm md:text-base">{episode.name}</p>
        <p className="text-gray-400 text-xs md:text-sm">{episode.description}</p>
        <div className="flex items-center gap-x-4">
          <PlayButton handlePlay={() => handlePlay(episode)} item={episode} />
          <div>
            <p className="text-gray-400 text-xs md:text-base">{episode.release_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
