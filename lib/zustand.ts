import create from "zustand";

type PlayTrack = {
    isPlaying:boolean;
    playingTrack:SpotifyApi.TrackObjectSimplified | {};
    setPlayingTrack:(data:SpotifyApi.TrackObjectSimplified) => void;
    setIsPlaying:(condition:boolean)=>void;
}

type Search = {
    search:string;
    setSearch:(search:string)=>void
}

export const usePlayTrack = create<PlayTrack>((set)=>({
    isPlaying:false,
    playingTrack:{},
    setPlayingTrack:async(data:SpotifyApi.TrackObjectSimplified)=>{
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
}))