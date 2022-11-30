import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { v4 } from "uuid";
import AlbumSearchItem from "./AlbumSearchItem";
import Card from "./Card";

interface IProps {
  albums: SpotifyApi.AlbumObjectSimplified[] | undefined;
}
const AlbumSearch = ({ albums }: IProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center gap-x-2 justify-between">
        <h1 className="font-bold text-white mb-4  text-base md:text-2xl">Albums</h1>
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-bold  rounded-full  whitespace-nowrap px-4 py-2 hover:-translate-y-1 ease-in-out duration-100 transition-all bg-white text-black"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>

      <div className="grid scrollbar overflow-x-scroll auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {albums?.slice(0, showMore ? albums.length : 5).map((album) => (
          <AlbumSearchItem key={v4()} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumSearch;
