import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";
import Loader from "../../components/Loader";
import TrackAlbum from "../../components/TrackAlbum";
import spotifyApi from "../../lib/spotifyApi";

const ArtistPage = () => {
  const router: any = useRouter();
  const { artistId } = router.query;

  const [seeAll, setSeeAll] = useState<boolean>(false);

  const fetchArtist = async () => {
    const res = await spotifyApi.getArtist(artistId);
    return await res.body;
  };
  const fetchRelatedArtist = async () => {
    const res = await spotifyApi.getArtistRelatedArtists(artistId);
    return await res.body;
  };
  
  

  const fetchArtistTopTracks = async () => {
    const res = await spotifyApi.getArtistTopTracks(artistId, "US");
    return await res.body;
  };

  const artist = useQuery(["fetchArtist"], fetchArtist);

  const artistTopTracks = useQuery(
    ["fetchArtistTopTracks"],
    fetchArtistTopTracks
  );
  // const relatedArtists = useQuery(
  //   ["fetchRelatedArtists"],
  //   fetchRelatedArtist,{
  //   refetchOnMount:true
  // }
 
  // );

  useEffect(() => {
    artist.refetch();
    artistTopTracks.refetch()
  }, [router]);

  console.log(artist);

  if (artist.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div>
      <div className="mt-4 flex items-center gap-x-4">
        <Image
          src={artist?.data?.images[1].url ?? ""}
          height={125}
          width={125}
          className="rounded-full"
        />
        <div className="flex flex-col space-y-4">
          <p className="font-bold text-6xl text-white">{artist?.data?.name}</p>
          <p className="text-gray-400">
            {artist?.data?.followers.total.toLocaleString()} followers
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-white text-2xl font-bold my-8">Popular</h1>
        {artistTopTracks?.data?.tracks
          .slice(0, seeAll ? artistTopTracks?.data?.tracks.length : 5)
          .map((track, i: number) => (
            <TrackAlbum track={track} index={i + 1} />
          ))}
        <button
          className="uppercase font-bold text-gray-400 mt-4"
          onClick={() => setSeeAll(!seeAll)}
        >
          {seeAll ? "See less" : "See all" }
        </button>
      </div>
      <Link href={`/album/5EzDhyNZuO7kuaABHwbBKX`}>
            fuck
      </Link>
    </div>
  );
};

export default ArtistPage;
