import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import spotifyApi from '../lib/spotifyApi';

const ProfilePage = () => {
    
    const { data:session } = useSession()
  const accessToken: any = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

    const fetchMyTopArtists = async() => {
        const res = await spotifyApi.getMyTopArtists();
        return await res.body;
    }

    const { data:topArtists,isLoading } = useQuery(["fetchMyTopArtists"],fetchMyTopArtists);

    console.log(topArtists)
  return (
    <div className='flex-col flex'>
        
    </div>
  )
}

export default ProfilePage