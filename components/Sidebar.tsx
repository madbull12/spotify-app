import Image from "next/image";
import React from "react";
import logo from "../public/img/logo.png";
import {
  IoMdHome,
  IoMdCompass,
  IoMdMicrophone,
  IoMdClock,
  IoMdLogOut,
  IoMdSearch,
} from "react-icons/io";
import { HiChartBar, HiDotsHorizontal } from "react-icons/hi";
import Dropdown from "./Dropdown";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsPlusSquare } from "react-icons/bs";
import { usePlaylistModal } from "../lib/zustand";
import shallow from "zustand/shallow";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // const [isOpen,setOpen] = usePlaylistModal((state)=>[state.isOpen,state.setOpen],shallow);
  const setOpen = usePlaylistModal((state) => state.setOpen);
  const setIsEditing = usePlaylistModal((state) => state.setIsEditing);

  return (
    <section className="fixed min-h-screen top-0 z-40 flex flex-col p-4 items-center bg-black w-[60px] lg:w-[90px]  space-y-8 h-screen">
      {session ? (
        <>
          <Image
            src={logo}
            width={60}
            height={60}
            alt="logo"
            objectFit="contain"
          />
          <div className="space-y-6 flex flex-col">
            <Link href="/">
              <IoMdHome
                data-tip="Home"
                className={`icon ${
                  router.pathname === "/" ? "text-white" : ""
                }`}
              />
            </Link>
            <Link href="/search">
              <div data-tip="Search">
                <IoMdSearch
                  data-tip="Search"
                  className={`icon ${
                    router.pathname === "/search" ? "text-white" : ""
                  }`}
                />
              </div>
            </Link>
            <div
              data-tip="Create playlist"
              onClick={() => {
                setOpen(true);
                setIsEditing(false);
                window.scrollTo(0, 0);
              }}
            >
              <BsPlusSquare className="icon" />
            </div>
            <Link href="/profile">
              <div
                data-tip="Profile"
            
              >
                <FaUser  className="icon" />
              </div>
            </Link>
            
            <IoMdCompass className="icon" />

            <IoMdMicrophone className="icon" />
            <HiChartBar className="icon" />
            <IoMdClock className="icon" />
            <HiDotsHorizontal className="icon" />
          </div>
          <IoMdLogOut
            className="text-2xl cursor-pointer text-white sm:hidden"
            onClick={() => signOut({ redirect: false })}
          />
        </>
      ) : null}
    </section>
  );
};

export default Sidebar;
