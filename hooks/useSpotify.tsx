import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyAPI from '../lib/spotifyApi';

function useSpotify() {
  const data:any = useSession();

  useEffect(() => {
    if (data?.session) {
      if (data?.session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyAPI.setAccessToken(data.session?.user?.accessToken);
    }
  }, [data?.session]);

  return spotifyAPI;
}

export default useSpotify;