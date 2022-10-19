import React from 'react'
import spotifyApi from '../lib/spotifyApi';
import { useSaveTrack } from '../lib/zustand';

interface IProps {
    myPlaylists:SpotifyApi.PlaylistObjectSimplified[] | undefined;
}
const PlaylistMenuList = ({ myPlaylists }:IProps) => {
  const savedTrack = useSaveTrack((state)=>state.savedTrack);

    const addTrackToPlaylist = async(playlist:SpotifyApi.PlaylistObjectSimplified) => {
        await spotifyApi.addTracksToPlaylist(playlist.id,[savedTrack?.uri]);
    }
  return (
    <div className="absolute p-4 w-44 h-56 overflow-y-scroll bg-neutral-900 right-full bottom-full  ">
    <ul>
        
        {myPlaylists?.map((playlist)=>(
            <li className="p-2 hover:bg-neutral-700" onClick={(e)=>{
                e.stopPropagation()
                addTrackToPlaylist(playlist)
            }}>{playlist.name}</li>
        ))}
    </ul>
</div>
  )
}

export default PlaylistMenuList