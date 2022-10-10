import create from "zustand";


export const usePlayTrack = create((set)=>({
    isPlaying:false,
    playingTrack:{},
    setPlayingTrack:async(data:any)=>{
        set({ playingTrack:data })
    },
    setIsPlaying:()=>set((state:boolean)=>({ isPlaying:!state }))
}));

export const useSearch = create((set)=>({
    search:"",
    setSearch:(search:string)=>set((state:any)=>({
        ...state,
        search
    }))
}))