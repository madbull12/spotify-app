import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { ISearchResult } from '../interface';
import spotifyApi from '../lib/spotifyApi';
import Card from './Card';
import Search from './Search'
import { v4 as uuidv4 } from 'uuid'

const Body = ({ chooseTrack }:any) => {
    const { data: session } = useSession();
    const { accessToken }:any = session;
    const [search,setSearch] = useState<string>("");
    const [searchResult,setSearchResult] = useState<any>(null);
    const [newReleases,setNewReleases] = useState<any>(null);


    useEffect(()=>{
      if(!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    },[accessToken]);



    useEffect(()=>{
      if(!search) return setSearchResult([]);
      if(!accessToken) return;

      spotifyApi.searchTracks(search).then((res:any)=>{
        setSearchResult(res.body.tracks.items);
      }).catch((err:any)=>console.log(err));
      console.log(searchResult)
    },[search,accessToken]);

    useEffect(()=>{

      if(!accessToken) return;

      spotifyApi.getNewReleases()
        .then((res:any)=>{
          setNewReleases(res.body.albums.items);
        }).catch((err:any)=>console.log(err))
    },[]);

    console.log(searchResult)
    // console.log(newReleases);


  return (
    <section className="bg-black ml-[3rem] lg:ml-[5.5rem] p-4 space-y-8 md:max-w-5xl flex-grow ">
        <Search search={search} setSearch={setSearch} />
        

        {search && (
          <div className="grid overflow-y-scroll scrollbar-hide gap-4 h-96 py-4 grid-cols-1 md:grid-cols-2">
          <div>
            <h1 className="text-white text-2xl font-bold mb-2">
              Top results
            </h1>
            {searchResult.slice(0,1).map((track:ISearchResult,i:number)=>(
              <Card key={i} items={track} cardClass="flex-col bg-[#171717] px-4 pt-4 pb-8" textClass="text-md md:text-lg lg:text-2xl xl:text-4xl font-bold" imageClass="max-w-[96px]" imageSrc={track.album.images[0].url} hidden={false} isTopResult={true} chooseTrack={chooseTrack} />
            ))}

          </div>
          <div className="space-y-2">
              <h1 className="text-white text-2xl font-bold ">
                Tracks
              </h1>
              {searchResult.slice(0,7).map((track:any,i:any)=>(
                <Card key={uuidv4()} items={track} cardClass="flex-row items-center  " textClass="text-sm md:text-base font-semibold " imageClass="max-w-[50px]" imageSrc={track.album.images[0].url} hidden={false} isTopResult={false} chooseTrack={chooseTrack} />
              ))}
          </div>
          
        </div>
        )}
          <h1 className="text-white text-2xl font-bold mb-2">New Releases</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-24  overflow-x-scroll  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
       
          {newReleases?.slice(0,4).map((release:any,i:any)=>(
            <Card key={i} items={release} cardClass="flex-col  px-4 pt-4 pb-8" textClass="text-lg font-bold " imageClass="w-[250px] relative" imageSrc={release.images[0].url} hidden={true} isTopResult={false} chooseTrack={chooseTrack} />
          ))}
        </div>
        <div className="flex gap-x-8 md:relative min-w-full ml-6">
          <div className="hidden xl:inline max-w-[270px]">
            <h2 className="text-white text-base lg:text-2xl font-bold mb-3">
              Genres
            </h2>
            <div>
              <div className="flex gap-x-2 flex-wrap gap-y-2.5 mb-4">
                <div className="genre">Classic</div>
                <div className="genre">House</div>
                <div className="genre">Minimal</div>
                <div className="genre">Hip Hop</div>
                <div className="genre">Electronic</div>
                <div className="genre">Chillout</div>
                <div className="genre">Blues</div>
                <div className="genre">Country</div>
                <div className="genre">Techno</div>
              </div>
              <button className="w-full text-white rounded-xl bg-green-500 py-2 px-4 font-bold hover:bg-green-600 ">
                All genres
              </button>
            </div>
          </div>
          <div className='w-full'>
            <h2 className="text-white text-base lg:text-2xl font-bold mb-3">
              {searchResult?.length !== 0 ? "Tracks" : "New Releases"}
            </h2>
            <div className="space-y-3 border-2 border-white rounded-2xl p-3 overflow-y-scroll h-64 md:h-96 scrollbar-thumb-gray-900 scrollbar-thin">
             
              {searchResult?.length === 0 
              ? newReleases?.slice(4,newReleases?.length)
                .map((track:any,i:any)=>(
                  <Card key={i} items={track} cardClass="flex-row items-center gap-2 " textClass="text-sm md:text-base font-semibold " imageClass="max-w-[50px]" imageSrc={track?.images[0].url} hidden={false} isTopResult={false} chooseTrack={chooseTrack}/>
                ))

               :  searchResult?.slice(4,searchResult.length)
               .map((track:any,i:any)=>(
                 <Card key={i} items={track} cardClass="flex-row items-center gap-2 " textClass="text-sm md:text-base font-semibold " imageClass="max-w-[50px]" imageSrc={track?.album.images[0].url} hidden={false} isTopResult={false} chooseTrack={chooseTrack}/>
               ))
              }
            
         
            </div>
          </div>
        </div>
   
     
    </section>
  )
}

export default Body