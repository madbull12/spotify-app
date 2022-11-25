import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import Card from "../../components/Card";
import CategoryCard from "../../components/CategoryCard";
import Search from "../../components/Search";
import useDebounce from "../../hooks/useDebounce";
import { IAlbum, ICategory, ISearchResult } from "../../interface";
import spotifyApi from "../../lib/spotifyApi";
import TrackSearch from "../../components/TrackSearch";
import AlbumSearch from "../../components/AlbumSearch";
import { useRouter } from "next/router";
import Link from "next/link";
import Dashboard from "../../components/Dashboard";
import SearchLayout from "../../components/SearchLayout";
import { NextPageWithLayout } from "../_app";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState, searchValue } from "../../atoms/searchAtom";
import { usePlayTrack, useSearch } from "../../lib/zustand";
import { FaPlay } from "react-icons/fa";
import PlayButton from "../../components/PlayButton";
import ArtistsSearch from "../../components/ArtistsSearch";
import PlaylistsSearch from "../../components/PlaylistsSearch";
import EpisodesSearch from "../../components/EpisodesSearch";
import PodcastSearch from "../../components/PodcastSearch";
import shallow from "zustand/shallow";
import useHandlePlay from "../../hooks/useHandlePlay";
import SearchNav from "../../components/SearchNav";

const SearchPage: NextPageWithLayout = () => {
  const search = useSearch((state: any) => state.search);
  const [searchResult, setSearchResult] =
    useState<SpotifyApi.SearchResponse | null>(null);
  const { status, data: session } = useSession();
  const debouncedSearch = useDebounce(search, 500);
  const [categories, setCategories] = useState<any>(null);
  const accessToken: any = session?.accessToken;
  const [hovered, setHovered] = useState<boolean>();
  const [playingTrack, setPlayingTrack] = usePlayTrack(
    (state: any) => [state.playingTrack, state.setPlayingTrack],
    shallow
  );
  const [isPlaying, setIsPlaying] = usePlayTrack(
    (state: any) => [state.isPlaying, state.setIsPlaying],
    shallow
  );

  const handlePlay = useHandlePlay();
  // const [hasLiked, setHasLiked] = useState(false);
  console.log(playingTrack);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    // if (!accessToken) return;

    const fetchCategories = async () => {
      try {
        const res = await spotifyApi.getCategories({ limit: 40 });
        setCategories(res.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!debouncedSearch) return setSearchResult(null);
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const res = await spotifyApi.search(
          debouncedSearch,
          ["track", "playlist", "album", "episode", "artist", "show"],
          {
            limit: 20,
            offset: 1,
          }
        );
        setSearchResult(res.body);
        // router.push(`/search?q=${debouncedSearch}`,undefined,{ shallow:true})
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedSearch) fetchData();
  }, [debouncedSearch, accessToken]);

  console.log(searchResult);
  // console.log(categories)

  return (
    <div>
      <Head>
        <title>Spotify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {debouncedSearch ? (
        <div className="space-y-8">
          <SearchNav />
          <div className="flex flex-col md:flex-row gap-y-4 gap-x-4 w-full mt-4">
            <div className="flex-[0.4]">
              <h1 className="text-white text-2xl font-bold mb-4">
                Top results
              </h1>
              {searchResult?.tracks?.items.slice(0, 1).map((track) => (
                <Link href={`/album/${track.album.id}`} key={v4()}>
                  <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <Card key={v4()} large={true}>
                      <Image
                        src={track.album.images[1].url ?? ""}
                        height={100}
                        className="rounded-lg"
                        width={100}
                      />
                      <p className="text-4xl text-white font-bold ">
                        {track.name}
                      </p>
                      <div className="flex items-center gap-x-4">
                        <Link href={`/artist/${track.artists[0].id}`}>
                          <p className="text-zinc-500 font-semibold truncate hover:underline">
                            {track.artists[0].name}
                          </p>
                        </Link>

                        <span className="bg-black rounded-full text-white  font-bold uppercase px-2 text-sm">
                          {track.type}
                        </span>
                      </div>
                      {hovered && (
                        <div className="absolute bottom-4 right-2">
                          <PlayButton handlePlay={handlePlay} item={track} />
                        </div>
                      )}
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
            <div className="space-y-2 flex-[0.6]">
              <h1 className="text-white text-2xl font-bold mb-4">Tracks</h1>
              <div className="border p-2 rounded-lg h-96 overflow-y-scroll  scrollbar-thumb-zinc-800 scrollbar-thin   scrollbar-track-gray-100">
                {searchResult?.tracks?.items.slice(0, 10).map((track) => (
                  <TrackSearch key={v4()} track={track} />
                ))}
              </div>
            </div>
          </div>

          <AlbumSearch albums={searchResult?.albums?.items} />
          <ArtistsSearch
            title={"Artists"}
            artists={searchResult?.artists?.items}
          />
          <PlaylistsSearch
            title="Playlists"
            playlists={searchResult?.playlists?.items}
          />
          <EpisodesSearch episodes={searchResult?.episodes?.items} />
          <PodcastSearch shows={searchResult?.shows?.items} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {categories?.categories.items.map((category: ICategory) => (
            <CategoryCard key={v4()} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>;
};

export default SearchPage;
