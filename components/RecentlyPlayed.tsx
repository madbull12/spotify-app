import Link from "next/link";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { IRecentlyPlayed, ITrack } from "../interface";

interface IProps {
  track: IRecentlyPlayed;
}
function RecentlyPlayed({ track }: IProps) {
  console.log(track);
  // const [play, setPlay] = useRecoilState(playState);
  // const [playingTrack, setPlayingTrack] = useRecoilState<any>(playingTrackState);

  // const handlePlay = () => {
  //   setPlayingTrack(track);

  //   if (track.track.uri === playingTrack.uri) {
  //     setPlay(!play);
  //   }
  // };

  return (
    <div className="flex items-center space-x-3">
      <img
        src={track?.track.album.images[1].url}
        alt="album-image"
        className="rounded-full w-[52px] h-[52px]"
      />
      <div>
        <Link href={`/album/${track?.track.album.id}`}>
          <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
            {track?.track.name}
          </h4>
        </Link>

        <Link href={`/artist/${track.track.artists[0].id}`}>
          <p className="text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
            {track?.track.artists[0]?.name}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RecentlyPlayed;
