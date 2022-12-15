import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import Container from "../../components/Container";
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
    <Container>
      <div className="flex space-y-4 flex-col md:flex-row  items-center gap-x-8 text-white">
        {show?.images.length !== 0 ? (
          <div className="relative h-44 w-full sm:w-1/2 md:w-1/3">
            <Image
              src={show?.images[0].url ?? NoImage}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="relative h-44 w-full sm:w-1/2 md:w-1/3">
          <Image src={NoImage} layout="fill" objectFit="cover" />

          </div>
        )}

        <div className="space-y-4 md:space-y-8 ">
          <p className="uppercase font-semibold text-sm md:text-base">
            {show?.type}
          </p>
          <h1 className="font-black md:text-5xl lg:text-6xl  text-3xl ">
            {show?.name}
          </h1>
          <p className="font-semibold">{show?.publisher}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-300 mt-6 w-3/4">
        {show?.episodes.items.map((episode) => (
          <EpisodeCard episode={episode} key={v4()} />
        ))}
      </div>
    </Container>
  );
};

export default ShowPage;
