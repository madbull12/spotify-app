import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import PlayButton from "./PlayButton";
import NoImage from "../public/img/no-image.jpg";
import Link from "next/link";
import useHover from "../hooks/useHover";
import useHandlePlay from "../hooks/useHandlePlay";

interface IProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}
const PlaylistSearchItem = ({ playlist }: IProps) => {
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();
  const handlePlay = useHandlePlay();

  return (
    <div ref={hoverRef}>
      <Card>
        <Link href={`/playlist/${playlist.id}`}>
          <div className="space-y-3 relative group ">
            <div className="relative">
              <Image
                src={playlist?.images[0]?.url ?? NoImage}
                height={150}
                width={150}
                objectFit="cover"
                className="rounded-md "
              />
              {isHovering && (
                <div className="absolute bottom-4 right-4 ">
                  <PlayButton
                    handlePlay={() => handlePlay(playlist)}
                    item={playlist}
                  />
                </div>
              )}
            </div>

            <p className="font-semibold text-white capitalize truncate">
              {playlist?.name}
            </p>
            <p className="text-gray-400 capitalize">
              by {playlist?.owner.display_name ?? "Unknown"}
            </p>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default PlaylistSearchItem;
