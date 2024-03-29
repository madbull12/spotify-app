import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import spotifyApi from "../../lib/spotifyApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loader from "../../components/Loader";
import timeConversion from "../../helper/timeConversion";
import PlayButton from "../../components/PlayButton";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import TrackSearch from "../../components/TrackSearch";
import TrackAlbum from "../../components/TrackAlbum";
import useHandlePlay from "../../hooks/useHandlePlay";
import { v4 } from "uuid";
import Link from "next/link";
import Banner from "../../components/Banner";
import NoImage from "../../public/img/no-image.jpg";
import Head from "next/head";
import Container from "../../components/Container";

const AlbumPage = () => {
  const router: any = useRouter();
  const handlePlay = useHandlePlay();

  const fetchAlbum = async () => {
    const res = await spotifyApi.getAlbum(router?.query.albumId);
    return await res.body;
  };
  const { data, isError, isLoading, refetch } = useQuery(
    ["getAlbum"],
    fetchAlbum,
    {
      staleTime: 100000,
    }
  );
  useEffect(() => {
    const controller = new AbortController();
    refetch();
    return () => {
      controller.abort();
    };
  }, [router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  console.log(data);
  let durations: any = data?.tracks.items.reduce(
    (acc: any, cur: any) => cur.duration_ms + acc,
    0
  );

  return (
    <Container>
      <div className="py-8  ">
        <Head>
          <title>Album | {data?.name}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex items-center gap-x-8 text-white flex-col md:flex-row gap-y-8">
          <div className="w-44 h-44 md:w-64 md:h-64 relative">
            <Image
              src={data?.images[1].url ?? ""}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="space-y-4 md:space-y-8 text-center">
            <p className="uppercase font-semibold text-xs md:text-base tracking-tighter">
              {data?.type}
            </p>
            <h1 className="font-black text-3xl md:text-6xl">{data?.name}</h1>
            <div className="flex items-center gap-x-2 font-semibold text-xs md:text-sm">
              <Link href={`/artist/${data?.artists[0].id}`}>
                <p className="hover:underline cursor-pointer">
                  {data?.artists[0].name}{" "}
                </p>
              </Link>
              <p>{data?.release_date.slice(0, 4)}</p>
              <p>{data?.total_tracks} tracks,</p>
              <p>{timeConversion(durations)}</p>
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center md:justify-start gap-x-3 md:gap-x-6">
          <PlayButton
            large={true}
            handlePlay={() => handlePlay(data)}
            item={data}
          />
          <FiHeart className="text-2xl md:text-4xl text-gray-400 " />
          <FiMoreHorizontal className="text-2xl md:text-4xl text-gray-400" />
        </div>

        <div className="flex flex-col text-gray-400 w-full">
          <div className="hidden md:flex items-center  gap-x-4 px-4">
            <span>#</span>
            <span className="flex-1">TITLE</span>
            <BsClock />
          </div>
          {data?.tracks.items.map((track, i: number) => (
            <TrackAlbum key={v4()} track={track} index={i + 1} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AlbumPage;
