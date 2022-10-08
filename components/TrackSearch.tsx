import Image from "next/image";
import React from "react";

interface IProps {
  track: SpotifyApi.TrackObjectFull;
}
const TrackSearch = ({ track }: IProps) => {
  return (
    <div className="p-2 cursor-pointer hover:bg-zinc-800 rounded-lg">
      <div className="gap-x-4 flex items-center">
        <Image
          src={track.album.images[2].url}
          height={45}
          width={45}
        />
        <div className="space-y-2">
            <p className="text-white">{track.name}</p>
            <p className="text-gray-400 text-sm">{track.artists[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackSearch;
