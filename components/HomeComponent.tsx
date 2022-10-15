import React, { useEffect, useState } from "react";
import Body from "./Body";
import Right from "./Right";
import Sidebar from "./Sidebar";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";
import Player from "./Player";
import spotifyApi from "../lib/spotifyApi";
import { IAlbum } from "../interface";
import NewRelease from "./NewRelease";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import PlaylistSearchItem from "./PlaylistSearchItem";
import PlaylistsSearch from "./PlaylistsSearch";
import { usePlayTrack } from "../lib/zustand";
import shallow from "zustand/shallow";

// const spotifyApi = new SpotifyWebApi({
//   clientId:process.env.SPOTIFY_CLIENT_ID,
//   clientSecret:process.env.SPOTIFY_CLIENT_SECRET,

// });

const HomeComponent = () => {
  // const [playingTrack, setPlayingTrack] =
  //   useRecoilState<any>(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playingTrack, setPlayingTrack] = usePlayTrack((state:any)=>[state.playingTrack,state.setPlayingTrack],shallow)
  const [isPlaying,setIsPlaying] = usePlayTrack((state:any)=>[state.isPlaying,state.setIsPlaying],shallow);
  const handlePlay = (items:SpotifyApi.AlbumObjectFull) => {
    setPlayingTrack(items);

    if (items.uri === playingTrack.uri) {
      setIsPlaying(!isPlaying);
    }
  };


  const { data: session } = useSession();
  const { accessToken }: any = session;
  const [newReleases, setNewReleases] = useState<any>(null);


  const fetchFeaturedPlaylists = async () => {
    const res = await spotifyApi.getFeaturedPlaylists();
    return await res.body;
  }

  const fetchMyTopArtists = async () => {
    const res = await spotifyApi.getMyTopArtists({
      limit:5
    });
    return await res.body;
  }


  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);



  useEffect(() => {
    if (!accessToken) return;

    const fetchNewReleases = async () => {
      try {
        const res = await spotifyApi.getNewReleases({ limit: 10 });
        setNewReleases(res.body.albums.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewReleases();
  }, []);

  useEffect(() => {
    setShowPlayer(true);
  }, []);


  const featuredPlaylists = useQuery(["fetchFeaturedPlaylists"],fetchFeaturedPlaylists);





  return (
    <main>
      {/* <Sidebar /> */}
      <Body>
        <h1 className="text-white text-2xl font-bold mb-2">New Releases</h1>
        <div className="grid   overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          {newReleases?.map((release: SpotifyApi.AlbumObjectFull) => (
            <NewRelease key={uuidv4()} items={release} handlePlay={handlePlay} />
          ))}
        </div>
        {/* <div className="flex gap-x-8 md:relative min-w-full ml-6">
          <div className="hidden xl:inline max-w-[270px]">
            <h2 className="text-white text-base lg:text-2xl font-bold mb-3">
              Genres
            </h2>
            <div>
              <div className="flex gap-x-2 flex-wrap gap-y-2.5 mb-4">
                <div className="genre">Classic</div>
                <div className="genre">House</div>
                <div className="genre">Minimal</div>
                <div className="genre">Hip Hop</div>
                <div className="genre">Electronic</div>
                <div className="genre">Chillout</div>
                <div className="genre">Blues</div>
                <div className="genre">Country</div>
                <div className="genre">Techno</div>
              </div>
              <button className="w-full text-white rounded-xl bg-green-500 py-2 px-4 font-bold hover:bg-green-600 ">
                All genres
              </button>
            </div>
          </div>
          <div className="w-full"></div>
        </div> */}
        <div className="">
    
          <PlaylistsSearch playlists={featuredPlaylists?.data?.playlists.items} title={featuredPlaylists?.data?.message} />
        </div>
      </Body>
   
    </main>
  );
};

export default HomeComponent;
