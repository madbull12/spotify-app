import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import spotifyApi from "../lib/spotifyApi";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const { data } = useSession();
  const { accessToken }:any = data;
  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;

    spotifyApi
      .search(search, ["track", "playlist", "album", "episode", "artist"], {
        limit: 20,
        offset: 1,
      })
      .then((res: any) => {
        setSearchResult(res.body);
      })
      .catch((err: any) => console.log(err));
  }, [search, accessToken]);
  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      {search && (
        <div className="grid overflow-y-scroll scrollbar-hide gap-4 h-96 py-4 grid-cols-1 md:grid-cols-2">
          <div>
            <h1 className="text-white text-2xl font-bold mb-2">Top results</h1>
            {/* {searchResult.slice(0, 1).map((track: ISearchResult) => (
              <Card
                key={uuidv4()}
                items={track}
           
              />
            ))} */}
          </div>
          <div className="space-y-2">
            <h1 className="text-white text-2xl font-bold ">Tracks</h1>
            {/* {searchResult.slice(0, 7).map((track: ISearchResult) => (
              <Card key={uuidv4()} items={track} />
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
