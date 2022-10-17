import Image from "next/image";
import React from "react";
import msToClock from "../helper/msToClock";

interface IProps {
  playlist: SpotifyApi.PlaylistTrackObject;
  i: number;
}
const PlaylistTrack = ({ playlist, i }: IProps) => {
  return (
    <div className="flex items-center gap-x-4 text-white">
      <p>{i + 1}</p>
      <div className="flex gap-x-2 items-center">
        <Image
          src={playlist.track?.album.images[0].url ?? ""}
          height={40}
          width={40}
        />
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
      <p className="text-gray-400">{playlist?.track?.album.name}</p>
      <p>{msToClock(playlist?.track?.disc_number)}</p>
    </div>
  );
};

export default PlaylistTrack;
