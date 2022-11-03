import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Backdrop from "../components/Backdrop";
import HomeComponent from "../components/HomeComponent";
import Loader from "../components/Loader";
import PlaylistModal from "../components/PlaylistModal";
import spotifyApi from "../lib/spotifyApi";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const [myData, setMyData] = useState<
    SpotifyApi.CurrentUsersProfileResponse | any
  >(null);
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const accessToken: any = session?.accessToken;

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

  const myPlaylists = useQuery(["fetchMyPlaylists"], fetchMyPlaylists);
  console.log(myPlaylists);

  console.log(myData);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Spotify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeComponent myPlaylists={myPlaylists.data?.items} />
    </div>
  );
};

export default Home;
