import React from 'react'
import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState } from '../atoms/playerAtom'

const spotifyApi = new SpotifyWebApi({
  clientId:process.env.SPOTIFY_CLIENT_ID,
  clientSecret:process.env.SPOTIFY_CLIENT_SECRET,

  
});



const Dashboard = () => {
  const[playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
  
  const chooseTrack = (track:any) => {
    setPlayingTrack(track);
  }

  return (
    <main className='flex min-h-screen min-w-screen' >
        <Sidebar />
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
    </main>
  )
}

export default Dashboard