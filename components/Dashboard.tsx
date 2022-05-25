import React, { useEffect, useState } from 'react'
import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'
import { useSession } from 'next-auth/react'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
  clientId:process.env.SPOTIFY_CLIENT_ID,
  clientSecret:process.env.SPOTIFY_CLIENT_SECRET,

  
});



const Dashboard = () => {
  const[playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer,setShowPlayer]= useState(false);

  const { data: session } = useSession();
  const { accessToken }:any = session;


  useEffect(()=>{
    setShowPlayer(true);
  },[])

  const chooseTrack = (track:any) => {
    setPlayingTrack(track);
  }

  return (
    <main className='flex min-h-screen min-w-screen' >
        <Sidebar />
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
        )}
      
    </main>
  )
}

export default Dashboard