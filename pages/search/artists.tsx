import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect } from "react";
import { v4 } from "uuid";
import ArtistSearchItem from "../../components/ArtistSearchItem";
import Loader from "../../components/Loader";
import SearchNavLayout from "../../components/SearchNavLayout";
import useDebounce from "../../hooks/useDebounce";
import spotifyApi from "../../lib/spotifyApi";
import { useSearch } from "../../lib/zustand";

const ArtistsPage = () => {
  const search = useSearch((state) => state.search);
  const debouncedSearch = useDebounce(search, 500);

  const { data: session } = useSession();
  const { accessToken }: any = session;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  const fetchArtistsSearch = async () => {
    const res = await spotifyApi.searchArtists(debouncedSearch, {
      limit: 40,
    });
    return await res.body;
  };

  const {
    data: searchArtists,
    isLoading,
    refetch,
  } = useQuery(["fetchArtistsSearch"], fetchArtistsSearch);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
      {searchArtists?.artists?.items.map((artist) => (
        <ArtistSearchItem key={v4()} artist={artist} />
      ))}
    </div>
  );
};

ArtistsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SearchNavLayout>{page}</SearchNavLayout>
    </>
  );
};
export default ArtistsPage;
