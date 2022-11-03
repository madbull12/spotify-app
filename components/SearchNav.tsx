import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SearchNav = () => {
  const router = useRouter();
  const isNavigated = (pathname: string) => {
    if (router.pathname.includes(pathname)) {
      return "bg-white text-black";
    }
  };
  return (
    <ul className="flex bg-black   items-center gap-x-4 ">
      <li
        className={`link-tag ${
          router.pathname === "/search" ? "bg-white text-black" : null
        }`}
      >
        <Link href={`/search`}>All</Link>
      </li>
      <li className={`link-tag ${isNavigated("tracks")}`}>
        <Link href={`/search/tracks`}>Tracks</Link>
      </li>
      <li className={`link-tag ${isNavigated("artists")}`}>
        <Link href={`/search/artists`}>Artists</Link>
      </li>
      <li className={`link-tag ${isNavigated("albums")}`}>
        <Link href={`/search/albums`}>Albums</Link>
      </li>
      <li className={`link-tag ${isNavigated("playlists")}`}>
        <Link href={`/search/playlists`}>Playlists</Link>
      </li>
      <li className={`link-tag ${isNavigated("podcasts")}`}>
        <Link href={`/search/podcastsAndEpisodes`}>Podcasts & episodes</Link>
      </li>
    </ul>
  );
};

export default SearchNav;
