import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { IAlbum } from "../interface";
import spotifyApi from "../lib/spotifyApi";
import Card from "./NewRelease";
import Search from "./Search";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactNode;
}
const Body = ({ children }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(router.pathname)
  const accessToken: any = session?.accessToken;
  // const [searchResult, setSearchResult] = useState<any>(null);
  const [newReleases, setNewReleases] = useState<any>(null);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // useEffect(() => {
  //   if (!search) return setSearchResult([]);
  //   if (!accessToken) return;

  //   spotifyApi
  //     .search(search,["track","playlist","album","episode","artist"],{ limit:20,offset:1 })
  //     .then((res: any) => {
  //       setSearchResult(res.body);
  //     })
  //     .catch((err: any) => console.log(err));
  // }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getNewReleases()
      .then((res: any) => {
        setNewReleases(res.body.albums.items);
      })
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <section className={`bg-black pb-32 min-h-screen ${router.pathname !== "/auth/signin" ? "ml-[3rem] lg:ml-[5.5rem] md:max-w-[980px]" : null}  p-4  space-y-8  flex-grow `}>
      {children}
    </section>
  );
};

export default Body;
