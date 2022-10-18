import create from "zustand";

type PlayTrack = {
    isPlaying:boolean;
    playingTrack:SpotifyApi.TrackObjectSimplified |null;
    setPlayingTrack:(data:SpotifyApi.TrackObjectFull) => void;
    setIsPlaying:(condition:boolean)=>void;
}

type Search = {
    search:string;
    setSearch:(search:string)=>void
}

type PlaylistModal = {
    isOpen:boolean;
    setOpen:(condition:boolean)=>void;

}

export const usePlayTrack = create<PlayTrack>((set)=>({
    isPlaying:false,
    playingTrack:null,
    setPlayingTrack:async(data:SpotifyApi.TrackObjectFull)=>{
        set({ playingTrack:data })
    },
    setIsPlaying:(condition:boolean)=>set(()=>({ isPlaying:condition }))
}));

export const useSearch = create<Search>((set)=>({
    search:"",
    setSearch:(search:string)=>set((state)=>({
        ...state,
        search
    }))
}));

export const usePlaylistModal = create<PlaylistModal>((set)=>({
    isOpen:false,
    setOpen:(open:boolean)=>set(()=>({ isOpen:open }))
}))