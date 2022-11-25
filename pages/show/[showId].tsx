import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import EpisodeCard from "../../components/EpisodeCard";
import spotifyApi from "../../lib/spotifyApi";
import NoImage from "../../public/img/no-image.jpg";
const ShowPage = () => {
  const router: any = useRouter();
  const fetchShow = async () => {
    const res = await spotifyApi.getShow(router.query.showId);
    return await res.body;
  };

  const { data: show } = useQuery(["fetchShow"], fetchShow);
  console.log(show);
  return (
    <div className="">
      <div className="flex items-center gap-x-8 text-white">
        {show?.images.length !== 0 ? (
          <Image
            src={show?.images[0].url ?? NoImage}
            height={250}
            width={250}
            objectFit="cover"
          />
        ) : (
          <Image src={NoImage} height={250} width={250} objectFit="cover" />
        )}

        <div className="space-y-8">
          <p className="uppercase font-semibold">{show?.type}</p>
          <h1 className="font-black text-6xl">{show?.name}</h1>
          <p className="font-semibold">{show?.publisher}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-300 mt-6 w-3/4">
        {show?.episodes.items.map((episode) => (
          <EpisodeCard  episode={episode} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default ShowPage;
