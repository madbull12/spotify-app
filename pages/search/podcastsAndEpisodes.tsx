import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect } from "react";
import { v4 } from "uuid";
import EpisodeSearchItem from "../../components/EpisodeSearchItem";
import EpisodesSearch from "../../components/EpisodesSearch";
import Loader from "../../components/Loader";
import SearchNavLayout from "../../components/SearchNavLayout";
import useDebounce from "../../hooks/useDebounce";
import spotifyApi from "../../lib/spotifyApi";
import { useSearch } from "../../lib/zustand";

const PodcastsPage = () => {
  const search = useSearch((state) => state.search);
  const debouncedSearch = useDebounce(search, 500);

  const { data: session } = useSession();
  const { accessToken }: any = session;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  const fetchPodcastsSearch = async () => {
    const res = await spotifyApi.searchEpisodes(debouncedSearch, {
      limit: 40,
    });
    return await res.body;
  };

  const {
    data: searchPodcasts,
    isLoading,
    refetch,
  } = useQuery(["fetchPodcastSearch"], fetchPodcastsSearch);
  useEffect(() => {
    refetch();
  }, [debouncedSearch]);
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-5 gap-4">
      {searchPodcasts?.episodes?.items.map((episode) => (
        <EpisodeSearchItem key={v4()} episode={episode} />
      ))}
    </div>
  );
};

PodcastsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SearchNavLayout>{page}</SearchNavLayout>
    </>
  );
};

export default PodcastsPage;
