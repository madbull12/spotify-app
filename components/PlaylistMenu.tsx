import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useRef, useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import useHover from "../hooks/useHover";
import useOnClickOutside from "../hooks/useOutsideClick";
import spotifyApi from "../lib/spotifyApi";
import PlaylistMenuList from "./PlaylistMenuList";

interface IProps {
  clickOutsideHandler: () => void;
}
const PlaylistMenu = ({ clickOutsideHandler }: IProps) => {
  const [myData, setMyData] = useState<
    SpotifyApi.CurrentUsersProfileResponse | any
  >(null);

  const menu = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { accessToken }: any = session;

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

  const fetchMyPlaylists = async () => {
    const res = await spotifyApi.getUserPlaylists(myData?.id);
    return await res.body;
  };

  const { data: myPlaylists } = useQuery(
    ["fetchMyPlaylists"],
    fetchMyPlaylists
  );

  const [hoverRef, isHovering] = useHover<HTMLDivElement>();

  useOnClickOutside(menu, clickOutsideHandler);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={menu}
      className="bg-neutral-900 p-1 absolute top-full rounded-sm right-0 w-44 text-white"
    >
      <ul>
        <div className="p-2 hover:bg-neutral-700 ">
          <div
            className="flex items-center relative rounded-sm justify-between "
            ref={hoverRef}
          >
            <li>Add to playlist</li>
            <AiOutlineCaretRight />
            {isHovering && (
              <PlaylistMenuList myPlaylists={myPlaylists?.items} />
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default PlaylistMenu;
