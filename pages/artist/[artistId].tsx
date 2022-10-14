import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import AlbumSearch from "../../components/AlbumSearch";
import AlbumSearchItem from "../../components/AlbumSearchItem";
import ArtistSearchItem from "../../components/ArtistSearchItem";
import ArtistsSearch from "../../components/ArtistsSearch";
import Loader from "../../components/Loader";
import TrackAlbum from "../../components/TrackAlbum";
import spotifyApi from "../../lib/spotifyApi";

const ArtistPage = () => {
  const router: any = useRouter();
  const { artistId } = router.query;
  const [discography, setDiscography] = useState<string>("album");

  const [seeAll, setSeeAll] = useState<boolean>(false);

  const fetchArtist = async () => {
    const res = await spotifyApi.getArtist(artistId);
    return await res.body;
  };
  const fetchRelatedArtist = async () => {
    const res = await spotifyApi.getArtistRelatedArtists(artistId);
    return await res.body;
  };

  const fetchArtistAlbums = async () => {
    const res = await spotifyApi.getArtistAlbums(artistId, {
      limit: 5,
    });
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
  const relatedArtists = useQuery(["fetchRelatedArtists"], fetchRelatedArtist);
  const artistAlbums = useQuery(["fetchArtistAlbums"], fetchArtistAlbums);

  useEffect(() => {
    artist.refetch();
    artistTopTracks.refetch();
    relatedArtists.refetch();
    artistAlbums.refetch();
  }, [router]);

  console.log(artistAlbums);

  if (artist.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="space-y-8">
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
        <h1 className="text-white text-2xl font-bold my-4">Popular</h1>
        {artistTopTracks?.data?.tracks
          .slice(0, seeAll ? artistTopTracks?.data?.tracks.length : 5)
          .map((track, i: number) => (
            <TrackAlbum track={track} index={i + 1} />
          ))}
        <button
          className="uppercase font-bold text-gray-400 mt-4"
          onClick={() => setSeeAll(!seeAll)}
        >
          {seeAll ? "See less" : "See all"}
        </button>
      </div>
      <div>
        <ArtistsSearch
          title={"Fans also like"}
          artists={relatedArtists?.data?.artists}
        />
      </div>
      <div>
        <h1>Discography</h1>
        <div className="flex gap-x-4 ">
          <button
            className="rounded-full cursor-pointer text-white bg-zinc-900 px-4 py-2"
            onClick={() => setDiscography("album")}
          >
            Albums
          </button>
          <button
            className="rounded-full cursor-pointer text-white bg-zinc-900 px-4 py-2"
            onClick={() => setDiscography("single")}
          >
            Single and EP
          </button>
        </div>
        <div
          className="grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100"
          mt-4
        >
          {artistAlbums?.data?.items
            .filter(
              (album) =>
                album.album_type ===
                (discography === "album" ? "album" : "single")
            )
            .map((album) => (
              <AlbumSearchItem album={album} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
