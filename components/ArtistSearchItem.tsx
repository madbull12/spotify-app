import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import PlayButton from "./PlayButton";
import NoImage from "../public/img/no-image.jpg";
import Link from "next/link";
import useHandlePlay from "../hooks/useHandlePlay";
import useHover from "../hooks/useHover";

interface IProps {
  artist: SpotifyApi.ArtistObjectFull;
}
const ArtistSearchItem = ({ artist }: IProps) => {
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();

  const handlePlay = useHandlePlay();

  return (
    <div ref={hoverRef}>
      <Card>
        <Link href={`/artist/${artist.id}`}>
          <div className="space-y-3 relative group ">
            <div className="relative">
              <Image
                src={artist?.images[0]?.url ?? NoImage}
                height={150}
                width={150}
                className="rounded-full "
                objectFit="cover"
              />
              {isHovering && (
                <div className="absolute bottom-4 right-4 ">
                  <PlayButton
                    handlePlay={() => handlePlay(artist)}
                    item={artist}
                  />
                </div>
              )}
            </div>

            <p className="font-semibold text-white capitalize truncate">
              {artist.name}
            </p>
            <p className="text-gray-400 capitalize">{artist.type}</p>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default ArtistSearchItem;
