import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import PlayButton from "../../components/PlayButton";
import TrackAlbum from "../../components/TrackAlbum";
import timeConversion from "../../helper/timeConversion";
import useHandlePlay from "../../hooks/useHandlePlay";
import spotifyApi from "../../lib/spotifyApi";
import { usePlaylistModal } from "../../lib/zustand";
import NoImage from "../../public/img/no-image.jpg";

const PlaylistPage = () => {
  const router: any = useRouter();
  const { data: session } = useSession();
  const { accessToken }: any = session;
  const [myData, setMyData] = useState<
    SpotifyApi.CurrentUsersProfileResponse | any
  >(null);
  const setOpenModal = usePlaylistModal((state) => state.setOpen);
  const setIsEditing = usePlaylistModal((state) => state.setIsEditing);
  const setEdit = usePlaylistModal((state) => state.setEditTrack);
  const handlePlay = useHandlePlay();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    // if (!accessToken) return;
    const controller = new AbortController();

    const fetchMe = async () => {
      try {
        const res = await spotifyApi.getMe();
        setMyData(res.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMe();
    return () => controller.abort();
  }, []);

  const fetchPlaylist = async () => {
    const res = await spotifyApi.getPlaylist(router.query.playlistId);
    return await res.body;
  };

  const { data: playlist, refetch } = useQuery(
    ["fetchPlaylist"],
    fetchPlaylist
  );

  useEffect(() => {
    refetch();
  }, [router]);

  console.log(myData);

  let durations: any = playlist?.tracks.items.reduce(
    (acc: any, cur: any) => cur?.track?.duration_ms + acc,
    0
  );
  let isOwner = playlist?.owner.id === myData?.id;

  const openEditModal = () => {
    setOpenModal(true);
    setIsEditing(true);
    setEdit(playlist);
  };
  return (
    <div className="">
      <div className="flex items-center gap-x-8 text-white">
        {playlist?.images.length !== 0 ? (
          <Image
            src={playlist?.images[0].url ?? NoImage}
            height={250}
            width={250}
            objectFit="cover"
          />
        ) : (
          <Image src={NoImage} height={250} width={250} objectFit="cover" />
        )}

        <div className="space-y-8">
          <p className="uppercase font-semibold tracking-tighter">
            {playlist?.type}
          </p>
          <h1
            className={`${
              isOwner ? "cursor-pointer" : null
            } font-black text-6xl`}
            onClick={() => {
              isOwner ? openEditModal() : null;
            }}
          >
            {playlist?.name}
          </h1>
          <p className="text-gray-400">{playlist?.description}</p>
          <div className="flex items-center gap-x-2 font-semibold text-sm">
            <p>{playlist?.owner.display_name}, </p>
            <p>{playlist?.followers.total} likes,</p>
            <p>{playlist?.tracks.items.length} tracks,</p>
            <p>{timeConversion(durations)}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center gap-x-6">
        <PlayButton
          large={true}
          handlePlay={() => handlePlay(playlist)}
          item={playlist}
        />
        <FiHeart className="text-4xl text-gray-400 " />
        <FiMoreHorizontal className="text-4xl text-gray-400" />
      </div>

      <div className="flex flex-col gap-y-4 mt-4">
        <div className="flex items-center gap-x-4 px-4 py-2 text-gray-400">
          <p>#</p>
          <p className="flex-[0.5]">TITLE</p>
          <p className="flex-[0.5]">ALBUM</p>
          <BsClock />
        </div>
        {playlist?.tracks.items.map(
          (playlist: SpotifyApi.PlaylistTrackObject, i) => (
            <TrackAlbum track={playlist?.track} index={i + 1} />
          )
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
