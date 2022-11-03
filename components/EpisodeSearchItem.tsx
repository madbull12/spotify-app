import Image from "next/image";
import React from "react";
import Card from "./Card";
import NoImage from "../public/img/no-image.jpg";
import timeConversion from "../helper/timeConversion";

interface IProps {
  episode: SpotifyApi.EpisodeObjectSimplified;
}

const EpisodeSearchItem = ({ episode }: IProps) => {
  return (
    <div>
      <Card>
        <div className="space-y-3 relative group ">
          <div className="relative">
            <Image
              src={episode.images[0].url ?? NoImage}
              height={150}
              width={150}
              className="rounded-md"
            />
          </div>

          <p className="font-semibold text-white truncate">{episode.name}</p>
          <p className="text-gray-400 text-sm">
            {episode.release_date} . {timeConversion(episode.duration_ms)}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default EpisodeSearchItem;
