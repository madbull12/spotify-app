import React, { useEffect, useState } from 'react'
import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'
import { useSession } from 'next-auth/react'
import Player from './Player'
import spotifyApi from '../lib/spotifyApi'
import { IAlbum } from '../interface'
import Card from './Card'
import { v4 as uuidv4 } from 'uuid'

// const spotifyApi = new SpotifyWebApi({
//   clientId:process.env.SPOTIFY_CLIENT_ID,
//   clientSecret:process.env.SPOTIFY_CLIENT_SECRET,

  
// });



const HomeComponent = () => {
  const[playingTrack,setPlayingTrack] = useRecoilState<any>(playingTrackState);
  const [showPlayer,setShowPlayer]= useState(false);

  const { data: session } = useSession();
  const { accessToken }: any = session;
  const [newReleases, setNewReleases] = useState<any>(null);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  


  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getNewReleases()
      .then((res: any) => {
        setNewReleases(res.body.albums.items);
      })
      .catch((err: any) => console.log(err));
  }, []);



  useEffect(()=>{
    setShowPlayer(true);
  },[])



 

  return (
    <main>
        {/* <Sidebar /> */}
        <Body>
        <h1 className="text-white text-2xl font-bold mb-2">New Releases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-24  overflow-x-scroll  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {newReleases?.slice(0, 4).map((release: IAlbum) => (
          <Card key={uuidv4()} items={release} />
        ))}
      </div>
      <div className="flex gap-x-8 md:relative min-w-full ml-6">
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
        <div className="w-full">
         
        </div>
      </div>
        </Body>
        {showPlayer && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <Player accessToken={accessToken} trackUri={playingTrack.uri} />
          </div>
        )}
      
    </main>
  )
}

export default HomeComponent