import React from 'react'
import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId:process.env.SPOTIFY_CLIENT_ID,
  clientSecret:process.env.SPOTIFY_CLIENT_SECRET,

  
});



const Dashboard = () => {
  return (
    <main >
        <Sidebar />
        <Body spotifyApi={spotifyApi} />
        <Right />
    </main>
  )
}

export default Dashboard