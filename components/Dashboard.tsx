import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import shallow from "zustand/shallow";
import { usePlayTrack } from "../lib/zustand";
import Body from "./Body";
import Player from "./Player";
import Right from "./Right";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [playingTrack, setPlayingTrack] = usePlayTrack(
    (state: any) => [state.playingTrack, state.setPlayingTrack],
    shallow
  );
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    setShowPlayer(true);
  }, [playingTrack]);

  // const { accessToken }: any = session;

  return (
    <div className="scroll-smooth">
      <Sidebar />
      <Body>{children}</Body>
      <Right />
      {showPlayer && (
        <div className="fixed  bottom-0 left-0 right-0 z-50">
          <Player
            accessToken={session?.accessToken}
            trackUri={playingTrack?.uri}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
