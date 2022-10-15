import React, { useEffect } from 'react'

import SpotifyPlayer from 'react-spotify-web-playback';
import { usePlayTrack } from '../lib/zustand';
import shallow from 'zustand/shallow';


const Player = ({ accessToken,trackUri }:any) => {
  //   const [play,setPlay]= useRecoilState(playState);
  // const[playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
  const [playingTrack, setPlayingTrack] = usePlayTrack((state:any)=>[state.playingTrack,state.setPlayingTrack],shallow)
  const [isPlaying,setIsPlaying] = usePlayTrack((state:any)=>[state.isPlaying,state.setIsPlaying],shallow);

  useEffect(()=>{
    if(trackUri) setIsPlaying(true);

  
  },[trackUri])

  if(!trackUri) return null;
  
  return (
    <SpotifyPlayer
    styles={{
      activeColor: "#fff",
      bgColor: "#181818",
      color: "#fff",
      loaderColor: "#1cb954",
      sliderColor: "#1cb954",
      trackArtistColor: "#ccc",
      trackNameColor: "#fff",
      height: "70px",
      sliderTrackColor: "#535353",
      sliderTrackBorderRadius: "4px",
      sliderHandleColor: "#fff",
      errorColor: "#fff",
    }}
    token={accessToken}
    showSaveIcon
    callback={(state) => {
      setIsPlaying(state.isPlaying);
    }}
    play={isPlaying}
    uris={trackUri ? [trackUri] : []}
    magnifySliderOnHover={true}
    autoPlay={true}
  />
  )
}

export default Player