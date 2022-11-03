import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import shallow from "zustand/shallow";
import useOnClickOutside from "../hooks/useOutsideClick";
import spotifyApi from "../lib/spotifyApi";
import { usePlaylistModal } from "../lib/zustand";
import { toast } from "react-hot-toast";
import NoImage from "../public/img/no-image.jpg";

interface IProps {
  isEditing: boolean;
}
const PlaylistModal = ({ isEditing }: IProps) => {
  const [name, setName] = useState<string>("");
  const router: any = useRouter();
  const [description, setDescription] = useState<string>("");
  const { data: session } = useSession();
  const { accessToken }: any = session;
  console.log(router);
  const setOpen = usePlaylistModal((state) => state.setOpen);

  const editValue = usePlaylistModal((state) => state.editTrack);

  const modal = useRef<HTMLDivElement>(null);

  const clickOutsidehandler = () => {
    setOpen(false);
  };
  useOnClickOutside(modal, clickOutsidehandler);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const editPlaylist = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await spotifyApi.changePlaylistDetails(
      router.query.playlistId,
      {
        name: name || editValue.name,
        description: description || editValue.description,
      }
    );

    toast.success("Playlist changed to " + name);
    return res;
  };

  const createPlaylist = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await spotifyApi.createPlaylist(name, {
      description,
      public: true,
    });

    setName("");
    setDescription("");
    setOpen(false);
    router.push(`/playlist/${res.body.id}`);

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } py-2 text-center bg-blue-500 rounded-lg w-40`}
      >
        <p className="text-white">Playlist created</p>
      </div>
    ));

    return res;
  };

  return (
    <div
      className="p-4 bg-zinc-800 rounded-xl text-white space-y-3"
      ref={modal}
    >
      <header className="flex justify-between items-center">
        <p className="font-bold text-xl">
          {isEditing ? "Edit details" : "Create playlist"}
        </p>
        <MdClose
          className="text-gray-400 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </header>
      <form
        className="flex flex-col"
        onSubmit={isEditing ? editPlaylist : createPlaylist}
      >
        <div className="flex  gap-x-4">
          <Image src={NoImage} height={200} width={200} />
          <div className="space-y-2 flex flex-col">
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={isEditing ? editValue.name : ""}
              placeholder="Enter playlist's name"
              className="bg-zinc-700 px-4 py-2 rounded-lg outline-none"
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={isEditing ? editValue.description : ""}
              placeholder="Add an optional description "
              className="px-4 py-2 bg-zinc-700 rounded-lg outline-none"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="font-bold text-black bg-white px-6 py-2 rounded-full self-end"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default PlaylistModal;
