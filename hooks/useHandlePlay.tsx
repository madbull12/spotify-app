import shallow from "zustand/shallow";
import { usePlayTrack } from "../lib/zustand";

export default function useHandlePlay()  {
    const [playingTrack, setPlayingTrack] = usePlayTrack((state:any)=>[state.playingTrack,state.setPlayingTrack],shallow)
    const [isPlaying,setIsPlaying] = usePlayTrack((state:any)=>[state.isPlaying,state.setIsPlaying],shallow);

      const handlePlay = (items:any) => {
        setPlayingTrack(items);

        if (items.uri === playingTrack?.uri) {
        setIsPlaying(!isPlaying);
        }
    };

    return handlePlay;
}