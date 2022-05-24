import React, { useState } from 'react'
import Image from 'next/image'
import { BsFillPauseFill,BsPlayFill,BsHeadphones,BsHeartFill,BsHeart } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'
import { group } from 'console'

const Card = ({items,cardClass,textClass,imageClass,imageSrc,hidden,isTopResult,chooseTrack }:any) => {
  const [play,setPlay]= useRecoilState(playState);
  const[playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
  const [hasLiked,setHasLiked] = useState(false);

  const handlePlay = () => {
    chooseTrack(items);
  
    if(items.uri === playingTrack.uri) {
      setPlay(!play);
    }
  }


  return (
    <div className={`flex ${cardClass} rounded-md group cursor-pointer  `} onClick={handlePlay}>
        <div className={`${imageClass}  overflow-hidden ${hidden && "group-hover:scale-110 transition-transform duration-200 ease-in-out"} `}>
            <Image alt="image" src={imageSrc} width={300} height={300} objectFit='cover' className={`brightness-75 rounded-xl w-full `} />
            {hidden && <div className="opacity-0 flex items-center gap-2 group-hover:opacity-100 group-hover:flex absolute z-10 bottom-4 left-2  transition-all duration-200 ease-out ">
              <div className=" w-7 h-7 rounded-full bg-green-500 flex justify-center items-center">
                {items.uri === playingTrack.uri && play ? (
                  <BsFillPauseFill className="text-white text-xl" />
                ):(
                  <BsPlayFill className="text-white text-xl" />

                )}
                
              </div>
              <div>
                <h1 className={` text-gray-200 ${textClass}`}>{items?.name}</h1>
                <p className="text-gray-200 text-base">{items?.artists[0].name}</p>
              </div>
                
            </div>}



        </div>
        {!hidden && (
          <div className={`flex flex-col relative w-full p-2 `}>
            <h1 className={` text-gray-200 ${textClass}`}>{items?.name}</h1>
            <h1 className={` text-gray-200 `}>{items?.artists[0].name}</h1>
            <div className='flex space-x-4 items-center'>
              <div className='flex gap-x-1 items-center'>

                <BsHeadphones className='text-white text-base lg:text-xl' />
                <p className='text-white'>{items.popularity}</p>
              </div>
              <div>
                {hasLiked ? <BsHeartFill className="text-green-500" onClick={(e)=>{
                  e.stopPropagation();
                  setHasLiked(!hasLiked);
                }} /> : <BsHeart className='text-white' onClick={()=>setHasLiked(!hasLiked)}  />}
              </div>
            </div>
              

            <div className={`rounded-full bg-green-500  justify-center items-center absolute bottom-2 right-2 hidden group-hover:flex ${!isTopResult ? "w-6 h-6" : "w-12 h-12"}`}>
             
                {items.uri === playingTrack.uri && play ? (
                  <BsFillPauseFill className="text-white text-xl" />
                ):(
                  <BsPlayFill className="text-white text-xl" />

                )}
              </div>
          </div>
        ) }
      

        
        

        
    </div>
  )
}

export default Card