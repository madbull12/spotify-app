import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import spotifyApi from '../lib/spotifyApi';
import { usePlaylistModal, useSaveTrack } from '../lib/zustand';

interface IProps {
    myPlaylists:SpotifyApi.PlaylistObjectSimplified[] | undefined;
}
const PlaylistMenuList = ({ myPlaylists }:IProps) => {
  const savedTrack = useSaveTrack((state)=>state.savedTrack);
  const setOpenModal = usePlaylistModal((state)=>state.setOpen);
  
  const { data: session } = useSession();
  const { accessToken }: any = session;
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

    const addTrackToPlaylist = async(playlist:SpotifyApi.PlaylistObjectSimplified) => {
        await spotifyApi.addTracksToPlaylist(playlist.id,[savedTrack?.uri]);

        toast.success("Track saved to " + playlist.name);
        router.push(`/playlist/${playlist.id}`)

    }

    const createAndSaveToPlaylist = async() => {
        const res = await spotifyApi.createPlaylist(savedTrack?.name);
        await spotifyApi.addTracksToPlaylist(res.body.id,[savedTrack?.uri]);

        toast.success("Track saved");
        router.push(`/playlist/${res.body.id}`)

        return res;
    }
  return (
    <div className="absolute p-1 w-44 h-56 overflow-y-scroll bg-neutral-900 right-full bottom-full  " >
    <ul>
        <li onClick={createAndSaveToPlaylist} className="p-2 hover:bg-neutral-700">
            Create playlist
        </li>
        
        {myPlaylists?.map((playlist)=>(
            <li className="p-2 hover:bg-neutral-700" onClick={(e)=>{
                addTrackToPlaylist(playlist)
            }}>{playlist.name}</li>
        ))}
    </ul>
</div>
  )
}

export default PlaylistMenuList