import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Loader from '../../components/Loader';
import PlaylistSearchItem from '../../components/PlaylistSearchItem';
import spotifyApi from '../../lib/spotifyApi';

const GenrePage = () => {
    const router:any = useRouter();
    const { data: session } = useSession();
    const { accessToken }: any = session;

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
      }, [accessToken]);

    const fetchCategoryPlaylists = async() => {
        const res = await spotifyApi.getPlaylistsForCategory(router.query.categoryId,{
            limit:40
        });
        return await res.body;
    }


    const { data,isLoading,isError } = useQuery(["categoryPlaylists"],fetchCategoryPlaylists,{
        staleTime:100000,
        refetchOnWindowFocus:false
    });

    console.log(data)
    if(isLoading) return (
        <div className='flex items-center justify-center'>
            <Loader />

        </div>
    )
    if(isError) return (
        <p className=''>There's some error fetching the data</p>
    )


  return (
  
        <div className='grid grid-cols-5 gap-4'>
            {data?.playlists.items.map((playlist:SpotifyApi.PlaylistObjectSimplified)=>(
                <PlaylistSearchItem playlist={playlist} />
            ))}
        </div>

   
  )
}

export default GenrePage