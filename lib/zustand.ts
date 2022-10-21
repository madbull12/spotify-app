import create from "zustand";

type PlayTrack = {
    isPlaying:boolean;
    playingTrack:SpotifyApi.TrackObjectSimplified | null;
    setPlayingTrack:(data:SpotifyApi.TrackObjectFull) => void;
    setIsPlaying:(condition:boolean)=>void;
}

type SaveTrack = {
    savedTrack:SpotifyApi.TrackObjectSimplified | any;
    setSavedTrack:(data:SpotifyApi.TrackObjectSimplified) => void;
}

type Search = {
    search:string;
    setSearch:(search:string)=>void
}

type PlaylistModal = {
    isOpen:boolean;
    setOpen:(condition:boolean)=>void;
    isEditing:boolean;
    setIsEditing:(condition:boolean)=>void;
    editTrack:SpotifyApi.TrackObjectFull | any;
    setEditTrack:(data:SpotifyApi.TrackObjectFull | any) => void
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
    isEditing:false,
    setIsEditing:(condition:boolean)=>set(()=>({ isEditing:condition })),
    setOpen:(condition:boolean)=>set(()=>({ isOpen:condition })),
    editTrack:null,
    setEditTrack:(data:SpotifyApi.TrackObjectFull) => set(()=>({ editTrack:data }))
}))

export const useSaveTrack = create<SaveTrack>((set)=>({
    savedTrack:null,
    setSavedTrack:async(data:SpotifyApi.TrackObjectSimplified)=>{
        set({ savedTrack:data })
    },
}));