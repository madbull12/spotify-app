import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { ReactElement, useEffect } from 'react'
import { v4 } from 'uuid';
import AlbumSearchItem from '../../components/AlbumSearchItem';
import Loader from '../../components/Loader';
import SearchNavLayout from '../../components/SearchNavLayout'
import useDebounce from '../../hooks/useDebounce';
import spotifyApi from '../../lib/spotifyApi';
import { useSearch } from '../../lib/zustand';

const AlbumsPage = () => {
    const search = useSearch((state)=>state.search);
    const debouncedSearch = useDebounce(search,500);
  
    const { data: session } = useSession();
    const { accessToken }: any = session;
  
    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);
    const fetchAlbumsSearch = async()=>{
      const res = await spotifyApi.searchAlbums(debouncedSearch,{
        limit:40
      });
      return await res.body;
    }
  
  
    const { data:searchAlbums,isLoading,refetch } = useQuery(["fetchArtistsSearch"],fetchAlbumsSearch);
    
    useEffect(()=>{
        refetch();
    },[debouncedSearch])
    if(isLoading) return <Loader />
  
    return (
      <div className='grid grid-cols-5 gap-4'>
        {searchAlbums?.albums?.items.map((album)=>(
          <AlbumSearchItem key={v4()} album={album} />
  
        ))}
      </div>
    )
}

AlbumsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <SearchNavLayout>
                
  
                {page}
  
  
            </SearchNavLayout>
        </>
  
    )
  }

export default AlbumsPage