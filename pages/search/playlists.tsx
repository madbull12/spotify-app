import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect } from "react";
import { v4 } from "uuid";
import ArtistSearchItem from "../../components/ArtistSearchItem";
import Loader from "../../components/Loader";
import PlaylistSearchItem from "../../components/PlaylistSearchItem";
import SearchNavLayout from "../../components/SearchNavLayout";
import useDebounce from "../../hooks/useDebounce";
import spotifyApi from "../../lib/spotifyApi";
import { useSearch } from "../../lib/zustand";

const PlaylistsPage = () => {
  const search = useSearch((state) => state.search);
  const debouncedSearch = useDebounce(search, 500);

  const { data: session } = useSession();
  const { accessToken }: any = session;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  const fetchPlaylistsSearch = async () => {
    const res = await spotifyApi.searchPlaylists(debouncedSearch, {
      limit: 40,
    });
    return await res.body;
  };

  const {
    data: playlistsSearch,
    isLoading,
    refetch,
  } = useQuery(["fetchPlaylistsSearch"], fetchPlaylistsSearch);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-5 gap-4">
      {playlistsSearch?.playlists?.items.map((playlist) => (
        <PlaylistSearchItem key={v4()} playlist={playlist} />
      ))}
    </div>
  );
};

PlaylistsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SearchNavLayout>{page}</SearchNavLayout>
    </>
  );
};
export default PlaylistsPage;
