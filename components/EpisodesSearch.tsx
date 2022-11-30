import React, { useState } from "react";
import { v4 } from "uuid";
import EpisodeSearchItem from "./EpisodeSearchItem";

interface IProps {
  episodes: SpotifyApi.EpisodeObjectSimplified[] | undefined;
}
const EpisodesSearch = ({ episodes }: IProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center gap-x-2 ">
        <h1 className="font-bold text-white mb-4  text-base md:text-2xl">Episodes</h1>
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-bold  whitespace-nowrap rounded-full px-4 py-2 hover:-translate-y-1 ease-in-out duration-100 transition-all bg-white text-black"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>

      <div className="grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {episodes?.slice(0, showMore ? episodes.length : 5).map((episode) => (
          <EpisodeSearchItem key={v4()} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default EpisodesSearch;
