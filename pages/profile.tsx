import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { v4 } from "uuid";
import TrackAlbum from "../components/TrackAlbum";
import TrackSearch from "../components/TrackSearch";
import spotifyApi from "../lib/spotifyApi";

const ProfilePage = () => {
  const { data: session } = useSession();
  const accessToken: any = session?.accessToken;
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const fetchMyTopArtists = async () => {
    const res = await spotifyApi.getMyTopArtists();
    return await res.body;
  };
  const fetchMyTopTracks = async () => {
    const res = await spotifyApi.getMyTopTracks();
    return await res.body;
  };

  const fetchMyProfile = async () => {
    const res = await spotifyApi.getMe();

    return await res.body;
  };

  const { data: topArtists } = useQuery(
    ["fetchMyTopArtists"],
    fetchMyTopArtists
  );
  const { data: topTracks } = useQuery(["fetchMyTopTracks"], fetchMyTopTracks);
  const myProfile: any = useQuery(["fetchMyProfile"], fetchMyProfile);
  console.log(myProfile);

  console.log(topArtists);
  return (
    <div className="flex-col flex items-center p-8 md:py-16 gap-y-6">
      {myProfile?.data?.images?.length === 0 ? (
        <div className="w-36 h-36 border-white border  rounded-full grid place-items-center">
          <FaUser className="text-7xl text-white " />
        </div>
      ) : (
        <img src={myProfile?.data?.images[0]?.url ?? ""} />
      )}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-white">
        {myProfile?.data?.display_name}
      </h1>
      <div className="flex items-center gap-x-6 flex-wrap justify-center">
        <div className="flex flex-col gap-y-2 items-center  ">
          <span className="text-green-500 font-bold text-lg md:text-2xl">
            {myProfile?.data?.followers?.total}
          </span>
          <span className="text-gray-500 font-bold text-sm ">FOLLOWERS</span>
        </div>
        <div className="flex flex-col gap-y-2 items-center ">
          <span className="text-green-500 font-bold text-lg md:text-2xl">
            {myProfile?.data?.followers?.total}
          </span>
          <span className="text-gray-500 font-bold text-sm ">FOLLOWING</span>
        </div>
        <div className="flex flex-col gap-y-2 items-center ">
          <span className="text-green-500 font-bold text-lg md:text-2xl">
            {myProfile?.data?.followers?.total}
          </span>
          <span className="text-gray-500 font-bold text-sm ">PLAYLIST</span>
        </div>
      </div>
      <div className="flex gap-x-4 flex-col sm:flex-row gap-y-8 w-full justify-center">
        <div className="space-y-4 flex-[0.5]">
          <h1 className="font-bold  text-base md:text-lg text-white">
            Top Artists of All Time
          </h1>
          <div className="space-y-4 ">
            {topArtists?.items.map((artist) => (
              <div
                key={v4()}
                onClick={() => router.push(`/artist/${artist.id}`)}
                className="p-2 cursor-pointer hover:bg-zinc-800 rounded-lg flex gap-x-4 items-center text-white"
              >
                <div className="md:w-[50px] w-[30px] h-[30px] md:h-[50px] relative">
                  <Image
                    src={artist?.images[0]?.url || ""}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
          
                <h1 className="truncate text-sm md:text-base">{artist.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 flex-[0.5] ">
          <h1 className="font-bold text-lg text-white">
            Top Tracks of All Time
          </h1>
          <div className="space-y-4 ">
            {topTracks?.items.map((track) => (
              <TrackSearch key={v4()} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
